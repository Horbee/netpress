import { useContext, useMemo } from 'react'

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonLabel,
  RefresherEventDetail,
} from '@ionic/react'

import { ArticleList } from '../components/ArticleList'
import { ArticlePageLayout } from '../components/ArticlePageLayout'
import { DarkModeContext } from '../context/DarkModeContext'
import { RSSFeedContext } from '../context/RSSFeedContext'
import { useRSSChips } from '../hooks/useRSSChips'
import { mapRSStoArticle } from '../services/map-rss-to-article'
import { fetchRSSFeed } from '../services/news-service'
import { useQuery } from 'react-query'

const RSSTab: React.FC = () => {
  const { active: isDarkMode } = useContext(DarkModeContext)
  const { rssAddressList } = useContext(RSSFeedContext)
  const { selectedFeed, setSelectedFeed, isSelected } = useRSSChips()

  const {
    data: articleResponse,
    isLoading,
    refetch,
  } = useQuery(['rss', selectedFeed!.url], () =>
    fetchRSSFeed(selectedFeed!.url)
  )

  const articles = useMemo(
    () => articleResponse?.items.map(mapRSStoArticle) ?? [],
    [articleResponse?.items]
  )

  const refreshRSSFeed = async (e: CustomEvent<RefresherEventDetail>) => {
    refetch()
    e.detail.complete()
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
