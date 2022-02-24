import { useContext } from "react";

import {
    IonCard, IonCardHeader, IonCardTitle, IonChip, IonLabel, RefresherEventDetail
} from "@ionic/react";

import { ArticleList } from "../components/ArticleList";
import { ArticlePageLayout } from "../components/ArticlePageLayout";
import { Paginator } from "../components/Paginator";
import { DarkModeContext } from "../context/DarkModeContext";
import { RSSFeedContext } from "../context/RSSFeedContext";
import { useRSSArticles } from "../hooks/useRSSArticles";
import { useRSSChips } from "../hooks/useRSSChips";

const RSSTab: React.FC = () => {
  const { active: isDarkMode } = useContext(DarkModeContext)
  const { rssAddressList } = useContext(RSSFeedContext)
  const { selectedFeed, setSelectedFeed, isSelected } = useRSSChips()

  const { refetch, isLoading, articles, paginationProps } = useRSSArticles(
    selectedFeed?.url ?? ''
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

      <Paginator {...paginationProps} />
    </ArticlePageLayout>
  )
}

export default RSSTab
