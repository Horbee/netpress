import "./RSSTab.css";

import { addOutline } from "ionicons/icons";
import { useContext, useRef, useState } from "react";

import {
    IonButton, IonCard, IonCardHeader, IonCardTitle, IonChip, IonIcon, IonLabel,
    RefresherEventDetail
} from "@ionic/react";

import { ArticleList } from "../../components/ArticleList";
import { ArticlePageLayout } from "../../components/ArticlePageLayout";
import { DarkModeContext } from "../../context/DarkModeContext";
import { RSSFeedContext } from "../../context/RSSFeedContext";
import { useRSSArticles } from "../../hooks/useRSSArticles";
import { useRSSChips } from "../../hooks/useRSSChips";
import { SelectRSSAddressModal } from "./SelectRSSAddressModal";
import { useSelectRSSAddressModal } from "./useSelectRSSAddressModal";

const RSSTab: React.FC = () => {
  const virtuosoRef = useRef(null)
  const chipWrapperRef = useRef<HTMLDivElement>(null)
  const { active: isDarkMode } = useContext(DarkModeContext)
  const { rssAddressList } = useContext(RSSFeedContext)
  const { selectedFeed, setSelectedFeed, isSelected } = useRSSChips()
  const [scrolledToTop, setScrolledToTop] = useState(true)

  const { openRSSModal, modalProps } = useSelectRSSAddressModal()

  const { refetch, isLoading, articles, loadMore } = useRSSArticles(
    selectedFeed?.url ?? ''
  )

  const refreshRSSFeed = async (e: CustomEvent<RefresherEventDetail>) => {
    refetch()
    e.detail.complete()
  }

  return (
    <ArticlePageLayout
      title="RSS Feed"
      refreshFunction={refreshRSSFeed}
      virtuosoRef={virtuosoRef}
      scrolledToTop={scrolledToTop}
    >
      <SelectRSSAddressModal {...modalProps} />
      <div className="ion-padding" ref={chipWrapperRef}>
        {rssAddressList.length === 0 ? (
          <IonCard className="spinner-wrapper">
            <IonCardHeader className="rss-warning">
              <IonCardTitle>Nincs RSS hírcsatorna hozzáadva</IonCardTitle>
              <IonButton onClick={openRSSModal}>Hozzáadás</IonButton>
            </IonCardHeader>
          </IonCard>
        ) : (
          <>
            {rssAddressList.map((feed) => (
              <IonChip
                key={feed.id}
                outline={!isSelected(feed)}
                color={isDarkMode ? 'warning' : 'tertiary'}
                onClick={() => setSelectedFeed(feed)}
              >
                <IonLabel>{feed.name}</IonLabel>
              </IonChip>
            ))}
            <IonChip
              outline
              color={isDarkMode ? 'warning' : 'tertiary'}
              onClick={openRSSModal}
            >
              <IonIcon icon={addOutline} />
              <IonLabel>Hozzáadás</IonLabel>
            </IonChip>
          </>
        )}
      </div>

      <ArticleList
        ref={virtuosoRef}
        chipWrapper={chipWrapperRef.current}
        isLoading={isLoading}
        articles={articles}
        loadMore={loadMore}
        setScrolledToTop={setScrolledToTop}
      />
    </ArticlePageLayout>
  )
}

export default RSSTab
