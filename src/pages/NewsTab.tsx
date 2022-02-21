import { FC, useContext, useEffect, useState } from "react";

import { IonList, IonSpinner, RefresherEventDetail, useIonRouter } from "@ionic/react";

import { ArticleItem } from "../components/ArticleItem";
import { ArticlePageLayout } from "../components/ArticlePageLayout";
import { categoryOptions } from "../config/constants";
import { CountryContext } from "../context/CountryContext";
import { ArticleData } from "../models/article-data";
import { fetchArticles } from "../services/news-service";

const NewsTab: FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useIonRouter()
  const categoryId = router.routeInfo.pathname.split('/')[2]
  const category = categoryOptions.find((opt) => opt.id === categoryId)

  const { country } = useContext(CountryContext)

  useEffect(() => {
    refreshArticles()
    // eslint-disable-next-line
  }, [categoryId])

  const refreshArticles = async (e?: CustomEvent<RefresherEventDetail>) => {
    if (!categoryId) {
      e?.detail.complete()
      return
    }

    try {
      setIsLoading(true)
      const response = await fetchArticles(categoryId, country)
      setArticles(response?.articles || [])
    } catch (err) {
      alert('A hireket nem sikerült lekerdezni')
      console.log(err)
    } finally {
      setIsLoading(false)
      e?.detail.complete()
    }
  }

  if (!category) return null

  return (
    <ArticlePageLayout title={category.name} refreshFunction={refreshArticles}>
      {isLoading ? (
        <div className="spinner-wrapper">
          <IonSpinner name="lines" color="primary" />
        </div>
      ) : (
        <IonList>
          {articles.map((article) => (
            <ArticleItem key={article.url} article={article} />
          ))}
        </IonList>
      )}
    </ArticlePageLayout>
  )
}

export default NewsTab
