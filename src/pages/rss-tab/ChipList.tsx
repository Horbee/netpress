import { addOutline } from 'ionicons/icons'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { IonChip, IonIcon, IonLabel } from '@ionic/react'

import { RSSFeedContext } from '../../context/RSSFeedContext'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useRSSChips } from '../../hooks/useRSSChips'

interface ChipListProps {
  openRSSModal: () => void
}

export const ChipList = ({ openRSSModal }: ChipListProps) => {
  const { t } = useTranslation()
  const { rssAddressList } = useContext(RSSFeedContext)
  const { darkTheme } = useDarkMode()
  const { setSelectedFeed, isSelected } = useRSSChips()

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
