import { FC, useContext } from 'react'

import {
  IonList,
  IonSpinner,
  RefresherEventDetail,
  useIonRouter,
} from '@ionic/react'

import { ArticleItem } from '../components/ArticleItem'
import { ArticlePageLayout } from '../components/ArticlePageLayout'
import { categoryOptions } from '../config/constants'
import { CountryContext } from '../context/CountryContext'
import { fetchArticles } from '../services/news-service'
import { useQuery } from 'react-query'

const NewsTab: FC = () => {
  const router = useIonRouter()
  const categoryId = router.routeInfo.pathname.split('/')[2]
  const category = categoryOptions.find((opt) => opt.id === categoryId)

  const { country } = useContext(CountryContext)

  const {
    data: articleResponse,
    isLoading,
    refetch,
  } = useQuery(['news', categoryId, country], () =>
    fetchArticles(categoryId, country)
  )

  const refreshArticles = async (e: CustomEvent<RefresherEventDetail>) => {
    refetch()
    e.detail.complete()
  }

  if (!category) return null

  return (
    <ArticlePageLayout title={category.name} refreshFunction={refreshArticles}>
      {isLoading && (
        <div className="spinner-wrapper">
          <IonSpinner name="lines" color="primary" />
        </div>
      )}

      {articleResponse && (
        <IonList>
          {articleResponse.articles.map((article) => (
            <ArticleItem key={article.url} article={article} />
          ))}
        </IonList>
      )}
    </ArticlePageLayout>
  )
}

export default NewsTab
