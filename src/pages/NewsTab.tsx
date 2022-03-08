import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Plugins } from '@capacitor/core'
import { RefresherEventDetail, useIonRouter } from '@ionic/react'

import { ArticleList } from '../components/ArticleList'
import { ArticlePageLayout } from '../components/ArticlePageLayout'
import { categoryOptions } from '../config/constants'
import { CountryContext } from '../context/CountryContext'
import { useArticles } from '../hooks/useArticles'

const { App: IonicApp } = Plugins

const NewsTab: FC = () => {
  const virtuosoRef = useRef(null)
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const { t } = useTranslation()

  const router = useIonRouter()
  const categoryId = router.routeInfo.pathname.split('/')[2]
  const category = categoryOptions.find((opt) => opt.id === categoryId)
  const { country } = useContext(CountryContext)

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

  return (
    <ArticlePageLayout
      title={t(`category.${category.id}`)}
      refreshFunction={refreshArticles}
      virtuosoRef={virtuosoRef}
      scrolledToTop={scrolledToTop}
    >
      <ArticleList
        ref={virtuosoRef}
        isLoading={isLoading}
        articles={articles}
        loadMore={loadMore}
        setScrolledToTop={setScrolledToTop}
      />
    </ArticlePageLayout>
  )
}

export default NewsTab
