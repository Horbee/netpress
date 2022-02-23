import { FC, useContext, useEffect, useState } from 'react'

import {
  IonButton,
  IonIcon,
  IonList,
  IonSpinner,
  RefresherEventDetail,
  useIonRouter,
} from '@ionic/react'

import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'

import { ArticleItem } from '../components/ArticleItem'
import { ArticlePageLayout } from '../components/ArticlePageLayout'
import { categoryOptions } from '../config/constants'
import { CountryContext } from '../context/CountryContext'
import { fetchArticles } from '../services/news-service'
import { useQuery } from 'react-query'

const NewsTab: FC = () => {
  const [page, setPage] = useState(1)
  const router = useIonRouter()
  const categoryId = router.routeInfo.pathname.split('/')[2]
  const category = categoryOptions.find((opt) => opt.id === categoryId)

  const { country } = useContext(CountryContext)

  const {
    data: articleResponse,
    isLoading,
    refetch,
  } = useQuery(['news', categoryId, country, page], () =>
    fetchArticles(categoryId, country, page)
  )

  useEffect(() => {
    setPage(1)
  }, [category, country])

  const hasNexPage = () => {
    if (!articleResponse) return false

    const pageSize = 20
    const currentPage = page
    const totalResults = articleResponse.totalResults

    return currentPage * pageSize < totalResults
  }

  const hasPreviousPage = () => {
    if (!articleResponse) return false

    const pageSize = 20
    const currentPage = page

    return currentPage * pageSize - pageSize > 0
  }

  const maxPageCount = () => {
    if (!articleResponse) return 0

    const pageSize = 20

    return Math.floor(articleResponse.totalResults / pageSize)
  }

  const getHintText = () => {
    if (!articleResponse) return ''

    const pageSize = 20

    const from = (page - 1) * pageSize + 1
    const to = Math.min(page * pageSize, articleResponse.totalResults)

    const range = from === to ? from.toString() : `${from} - ${to}`

    return `${range} / ${articleResponse.totalResults}`
  }

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
        <>
          <IonList>
            {articleResponse.articles.map((article) => (
              <ArticleItem key={article.url} article={article} />
            ))}
          </IonList>

          <div
            className="ion-padding"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {hasPreviousPage() && (
              <IonButton onClick={() => setPage((prev) => prev - 1)}>
                <IonIcon slot="icon-only" icon={chevronBackOutline} />
              </IonButton>
            )}

            {getHintText()}

            {hasNexPage() && (
              <IonButton onClick={() => setPage((prev) => prev + 1)}>
                <IonIcon slot="icon-only" icon={chevronForwardOutline} />
              </IonButton>
            )}
          </div>
        </>
      )}
    </ArticlePageLayout>
  )
}

export default NewsTab
