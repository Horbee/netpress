import { FC, useContext } from "react";

import { IonList, IonSpinner, RefresherEventDetail, useIonRouter } from "@ionic/react";

import { ArticleItem } from "../components/ArticleItem";
import { ArticlePageLayout } from "../components/ArticlePageLayout";
import { Paginator } from "../components/Paginator";
import { categoryOptions } from "../config/constants";
import { CountryContext } from "../context/CountryContext";
import { useArticles } from "../hooks/useArticles";

const NewsTab: FC = () => {
  const router = useIonRouter()
  const categoryId = router.routeInfo.pathname.split('/')[2]
  const category = categoryOptions.find((opt) => opt.id === categoryId)
  const { country } = useContext(CountryContext)

  const { refetch, isLoading, articleResponse, paginationProps } = useArticles(
    categoryId,
    country
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
        <>
          <IonList>
            {articleResponse.articles.map((article) => (
              <ArticleItem key={article.url} article={article} />
            ))}
          </IonList>

          <Paginator {...paginationProps} />
        </>
      )}
    </ArticlePageLayout>
  )
}

export default NewsTab
