import { addOutline } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'


import { IonChip, IonIcon, IonLabel } from '@ionic/react'


import { useRSSFeed } from '../../context/RSSFeedProvider'
import { useDarkMode } from '../../hooks/useDarkMode'
import { RSSFeedAddress } from '../../models/rss-feed-data'

interface ChipListProps {
  openRSSModal: () => void
  setSelectedFeed: (feed: RSSFeedAddress) => void
  isSelected: (feed: RSSFeedAddress) => boolean
}

export const ChipList = ({
  openRSSModal,
  setSelectedFeed,
  isSelected,
}: ChipListProps) => {
  const { t } = useTranslation()
  const { rssAddressList } = useRSSFeed()
  const { darkTheme } = useDarkMode()

  return (
    <div className="ion-padding">
      {rssAddressList.map((feed) => (
        <IonChip
          key={feed.id}
          outline={!isSelected(feed)}
          color={darkTheme ? 'warning' : 'tertiary'}
          onClick={() => setSelectedFeed(feed)}
        >
          <IonLabel>{feed.name}</IonLabel>
        </IonChip>
      ))}
      <IonChip
        outline
        color={darkTheme ? 'warning' : 'tertiary'}
        onClick={openRSSModal}
      >
        <IonIcon icon={addOutline} />
        <IonLabel>{t('rssTab.add')}</IonLabel>
      </IonChip>
    </div>
  )
}
