import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Plugins } from '@capacitor/core'
import { IonSpinner, RefresherEventDetail, useIonRouter } from '@ionic/react'

import { ArticleList } from '../components/ArticleList'
import { ArticlePageLayout } from '../components/ArticlePageLayout'
import { categoryOptions } from '../config/constants'
import { useArticles } from '../hooks/useArticles'
import { useCountry } from '../hooks/useCountry'

const { App: IonicApp } = Plugins

const NewsTab: FC = () => {
  const virtuosoRef = useRef(null)
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const { t } = useTranslation()

  const router = useIonRouter()
  const categoryId = router.routeInfo.pathname.split('/')[2]
  const category = categoryOptions.find((opt) => opt.id === categoryId)
  const { country } = useCountry()

  const { refetch, isLoading, articles, loadMore } = useArticles(
    categoryId,
    country
  )

  useEffect(() => {
    const exitAppFunction = (ev: any) => {
      ev.detail.register(-1, () => {
        if (!router.canGoBack()) {
          IonicApp.exitApp()
        }
      })
    }

    document.addEventListener('ionBackButton', exitAppFunction)

    return () => {
      document.removeEventListener('ionBackButton', exitAppFunction)
    }
  }, [])

  const refreshArticles = async (e: CustomEvent<RefresherEventDetail>) => {
    refetch()
    e.detail.complete()
  }

  if (!category) return null

  const Header = () => (
    <>
      {isLoading && (
        <div className="spinner-wrapper">
          <IonSpinner name="lines" color="primary" />
        </div>
      )}
    </>
  )

  return (
    <ArticlePageLayout
      title={t(`category.${category.id}`)}
      refreshFunction={refreshArticles}
      virtuosoRef={virtuosoRef}
      scrolledToTop={scrolledToTop}
    >
      <ArticleList
        ref={virtuosoRef}
        articles={articles}
        loadMore={loadMore}
        setScrolledToTop={setScrolledToTop}
        virtuosoProps={{
          components: { Header },
        }}
      />
    </ArticlePageLayout>
  )
}

export default NewsTab
