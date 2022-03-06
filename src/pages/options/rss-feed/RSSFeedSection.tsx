import { addOutline } from 'ionicons/icons'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { IonButton, IonButtons, IonIcon, IonItemDivider, IonReorderGroup } from '@ionic/react'

import { RSSFeedContext } from '../../../context/RSSFeedContext'
import { RSSAddressModal } from './RSSAddressModal'
import { RSSFeedItem } from './RSSFeedItem'
import { useRSSAddressModal } from './useRSSAddressModal'

export const RSSFeedSection = () => {
  const { rssAddressList, saveRSSAddressList } = useContext(RSSFeedContext)
  const { openRSSModal, modalProps } = useRSSAddressModal()
  const { t } = useTranslation()

  const doReorder = (event: CustomEvent) => {
    const newOrder = event.detail.complete(rssAddressList)
    saveRSSAddressList(newOrder)
  }

  return (
    <>
      <RSSAddressModal {...modalProps} />
      <IonItemDivider>
        <IonButtons slot="end">
          <IonButton onClick={() => openRSSModal()}>
            <IonIcon slot="icon-only" icon={addOutline} />
          </IonButton>
        </IonButtons>
        {t('options.rssFeedList')}
      </IonItemDivider>
      <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
        {rssAddressList.map((rss) => (
          <RSSFeedItem
            key={rss.id}
            rss={rss}
            onItemSelect={() => openRSSModal(rss)}
          />
        ))}
      </IonReorderGroup>
    </>
  )
}
