import "./NewsTab.css";

import { settingsOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

import {
    IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonPage, IonRefresher,
    IonRefresherContent, IonSpinner, IonTitle, IonToolbar, RefresherEventDetail, useIonRouter
} from "@ionic/react";

import { ArticleItem } from "../components/ArticleItem";
import { categoryOptions } from "../config/constants";
import { ArticleData } from "../models/article-data";
import { fetchArticles } from "../services/news-service";

const NewsTab: React.FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useIonRouter()
  const categoryId = router.routeInfo.pathname.split('/')[2]
  const category = categoryOptions.find((opt) => opt.id === categoryId)

  useEffect(() => {
    if (categoryId) {
      refreshArticles()
    }
    // eslint-disable-next-line
  }, [categoryId])

  const refreshArticles = async (event?: CustomEvent<RefresherEventDetail>) => {
    try {
      setIsLoading(true)
      const response = await fetchArticles(categoryId)
      setArticles(response?.articles || [])
    } catch (err) {
      alert(JSON.stringify(err))
    } finally {
      setIsLoading(false)
      event?.detail.complete()
    }
  }

  if (!category) return null

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => router.push('/options')}>
              <IonIcon icon={settingsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{category.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{category.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={refreshArticles}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="ion-padding">
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
        </div>
      </IonContent>
    </IonPage>
  )
}

export default NewsTab
