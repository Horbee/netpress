import './NewsTab.css'

import { logoRss, settingsOutline } from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'

import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonRouter,
} from '@ionic/react'

import { ArticleItem } from '../components/ArticleItem'
import { RSSFeedContext } from '../context/RSSFeedContext'
import { ArticleData } from '../models/article-data'
import { mapRSStoArticle } from '../services/map-rss-to-article'
import { fetchRSSFeed } from '../services/news-service'
import { useRSSChips } from '../hooks/useRSSChips'

const RSSTab: React.FC = () => {
  const { rssAddressList } = useContext(RSSFeedContext)
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useIonRouter()
  const { selectedFeed, setSelectedFeed, isSelected } = useRSSChips()

  useEffect(() => {
    if (selectedFeed) {
      refreshRSSFeed()
    }
    // eslint-disable-next-line
  }, [selectedFeed])

  const refreshRSSFeed = async (event?: CustomEvent<RefresherEventDetail>) => {
    try {
      setIsLoading(true)
      const response = await fetchRSSFeed(selectedFeed!.url)
      const articles = response!.items.map(mapRSStoArticle)
      console.log({ articles })
      setArticles(articles)
    } catch (err) {
      console.log(err)
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
          {rssAddressList.map((feed) => (
            <IonChip
              key={feed.id}
              outline={!isSelected(feed)}
              color="primary"
              onClick={() => setSelectedFeed(feed)}
            >
              <IonLabel>{feed.name}</IonLabel>
            </IonChip>
          ))}

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
