import { FC, useContext, useRef, useState } from 'react'

import { RefresherEventDetail, useIonRouter } from '@ionic/react'

import { ArticleList } from '../components/ArticleList'
import { ArticlePageLayout } from '../components/ArticlePageLayout'
import { categoryOptions } from '../config/constants'
import { CountryContext } from '../context/CountryContext'
import { useArticles } from '../hooks/useArticles'

const NewsTab: FC = () => {
  const virtuosoRef = useRef(null)
  const [scrolledToTop, setScrolledToTop] = useState(true)

  const router = useIonRouter()
  const categoryId = router.routeInfo.pathname.split('/')[2]
  const category = categoryOptions.find((opt) => opt.id === categoryId)
  const { country } = useContext(CountryContext)

  const { refetch, isLoading, articles, loadMore } = useArticles(
    categoryId,
    country
  )

  const refreshArticles = async (e: CustomEvent<RefresherEventDetail>) => {
    refetch()
    e.detail.complete()
  }

  if (!category) return null

  return (
    <ArticlePageLayout
      title={category.name}
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
