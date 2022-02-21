import { useContext, useEffect, useState } from "react";

import {
    IonCard, IonCardHeader, IonCardTitle, IonChip, IonLabel, RefresherEventDetail
} from "@ionic/react";

import { ArticleList } from "../components/ArticleList";
import { ArticlePageLayout } from "../components/ArticlePageLayout";
import { DarkModeContext } from "../context/DarkModeContext";
import { RSSFeedContext } from "../context/RSSFeedContext";
import { useRSSChips } from "../hooks/useRSSChips";
import { ArticleData } from "../models/article-data";
import { mapRSStoArticle } from "../services/map-rss-to-article";
import { fetchRSSFeed } from "../services/news-service";

const RSSTab: React.FC = () => {
  const { active: isDarkMode } = useContext(DarkModeContext)
  const { rssAddressList } = useContext(RSSFeedContext)
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { selectedFeed, setSelectedFeed, isSelected } = useRSSChips()

  useEffect(() => {
    refreshRSSFeed()
    // eslint-disable-next-line
  }, [selectedFeed])

  const refreshRSSFeed = async (e?: CustomEvent<RefresherEventDetail>) => {
    if (!selectedFeed) {
      e?.detail.complete()
      return
    }

    try {
      setIsLoading(true)
      const response = await fetchRSSFeed(selectedFeed!.url)
      const articles = response!.items.map(mapRSStoArticle)
      setArticles(articles)
    } catch (err) {
      alert('A hireket nem sikerült lekerdezni')
      console.log(err)
    } finally {
      setIsLoading(false)
      e?.detail.complete()
    }
  }

  return (
    <ArticlePageLayout title="RSS Feed" refreshFunction={refreshRSSFeed}>
      <div className="ion-padding">
        {rssAddressList.length === 0 ? (
          <IonCard className="spinner-wrapper">
            <IonCardHeader>
              <IonCardTitle>RSS lista üres</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        ) : (
          rssAddressList.map((feed) => (
            <IonChip
              key={feed.id}
              outline={!isSelected(feed)}
              color={isDarkMode ? 'warning' : 'tertiary'}
              onClick={() => setSelectedFeed(feed)}
            >
              <IonLabel>{feed.name}</IonLabel>
            </IonChip>
          ))
        )}
      </div>

      <ArticleList isLoading={isLoading} articles={articles} />
    </ArticlePageLayout>
  )
}

export default RSSTab
