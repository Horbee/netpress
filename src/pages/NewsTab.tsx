import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react'
import { useHistory, useParams } from 'react-router'
import { categoryOptions } from '../config/constants'
import './NewsTab.css'
import { settingsOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { ArticleData } from '../models/article-data'
import { fetchArticles } from '../services/news-service'
import { ArticleItem } from '../components/ArticleItem'

interface NewsTabParams {
  tab: string
  category: string
}

const NewsTab: React.FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  const { category } = useParams<NewsTabParams>()
  const [name] = categoryOptions[category ?? 'general']

  useEffect(() => {
    refreshArticles()
    // eslint-disable-next-line
  }, [category])

  const refreshArticles = async (event?: CustomEvent<RefresherEventDetail>) => {
    try {
      setIsLoading(true)
      const response = await fetchArticles(category)
      setArticles(response?.articles || [])
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
            <IonButton onClick={() => history.push('/options')}>
              <IonIcon icon={settingsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
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
