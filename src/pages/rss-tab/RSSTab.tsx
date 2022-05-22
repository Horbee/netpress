import './RSSTab.css'


import { useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'


import { IonHeader, IonSpinner, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react'


import { ArticleList } from '../../components/article-list/ArticleList'
import { ArticlePageLayout } from '../../components/ArticlePageLayout'
import { RSSFeedContext } from '../../context/RSSFeedContext'
import { useRSSArticles } from '../../hooks/useRSSArticles'
import { useRSSChips } from '../../hooks/useRSSChips'
import { ChipList } from './ChipList'
import { EmptyList } from './EmptyList'
import { SelectRSSAddressModal } from './SelectRSSAddressModal'
import { useSelectRSSAddressModal } from './useSelectRSSAddressModal'

const RSSTab: React.FC = () => {
  const virtuosoRef = useRef(null)
  const { rssAddressList } = useContext(RSSFeedContext)
  const { selectedFeed, setSelectedFeed, isSelected } = useRSSChips()
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const { t } = useTranslation()

  const { openRSSModal, modalProps } = useSelectRSSAddressModal()

  const { refetch, isLoading, articles, loadMore } = useRSSArticles(
    selectedFeed?.url ?? ''
  )

  const refreshRSSFeed = async (e: CustomEvent<RefresherEventDetail>) => {
    refetch()
    e.detail.complete()
  }

  const Header = () => (
    <>
      {/* Prints error message: <ion-header> must be used inside ion-content */}
      {!isLoading && (
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t('rssTab.title')}</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}

      <ChipList
        openRSSModal={openRSSModal}
        setSelectedFeed={setSelectedFeed}
        isSelected={isSelected}
      />

      {isLoading && (
        <div className="spinner-wrapper">
          <IonSpinner name="lines" color="primary" />
        </div>
      )}
    </>
  )

  return (
    <ArticlePageLayout
      title={t('rssTab.title')}
      refreshFunction={refreshRSSFeed}
      virtuosoRef={virtuosoRef}
      scrolledToTop={scrolledToTop}
    >
      <SelectRSSAddressModal {...modalProps} />
      {rssAddressList.length === 0 && <EmptyList openRSSModal={openRSSModal} />}

      {!!rssAddressList.length && (
        <ArticleList
          ref={virtuosoRef}
          articles={articles}
          loadMore={loadMore}
          setScrolledToTop={setScrolledToTop}
          virtuosoProps={{
            components: { Header },
          }}
        />
      )}
    </ArticlePageLayout>
  )
}

export default RSSTab
