import "./NewsTab.css";

import { XMLParser } from "fast-xml-parser";
import { logoRss, settingsOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";

import {
    IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonPage, IonRefresher,
    IonRefresherContent, IonSpinner, IonTitle, IonToolbar, RefresherEventDetail, useIonRouter
} from "@ionic/react";

import { ArticleItem } from "../components/ArticleItem";
import { categoryOptions } from "../config/constants";
import { CountryContext } from "../context/CountryContext";
import { RSSFeedContext } from "../context/RSSFeedContext";
import { ArticleData } from "../models/article-data";
import { mapRSStoArticle } from "../services/map-rss-to-article";
import { fetchArticles, fetchRSSFeed } from "../services/news-service";

const parser = new XMLParser({
  ignoreAttributes: false,
})

const RSSTab: React.FC = () => {
  const { rssAddressList } = useContext(RSSFeedContext)
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useIonRouter()

  useEffect(() => {
    refreshRSSFeed()
    // eslint-disable-next-line
  }, [])

  const refreshRSSFeed = async (event?: CustomEvent<RefresherEventDetail>) => {
    try {
      setIsLoading(true)
      const promises = rssAddressList.map((item) => fetchRSSFeed(item.url))
      const responses = await Promise.all(promises)
      // const items = responses.flatMap((r) => parser.parse(r).rss.channel.item)
      const items = responses.flatMap((r) => r.items)
      console.log(items)
      const articles = items.map(mapRSStoArticle)
      setArticles(articles)
    } catch (err) {
      alert(JSON.stringify(err))
    } finally {
      setIsLoading(false)
      event?.detail.complete()
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => router.push('/rss')}>
              <IonIcon icon={logoRss}></IonIcon>
            </IonButton>
            <IonButton onClick={() => router.push('/options')}>
              <IonIcon icon={settingsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>RSS Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">RSS Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={refreshRSSFeed}>
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

export default RSSTab
