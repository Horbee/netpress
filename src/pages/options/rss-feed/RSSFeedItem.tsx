import { buildOutline, trashOutline } from 'ionicons/icons'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'


import {
    IonButton, IonButtons, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
    IonLabel, IonReorder, useIonAlert
} from '@ionic/react'


import { RSSFeedContext } from '../../../context/RSSFeedProvider'
import { RSSFeedAddress } from '../../../models/rss-feed-data'

interface RSSFeedItemProps {
  rss: RSSFeedAddress
  onItemSelect: () => void
}

export const RSSFeedItem = ({ rss, onItemSelect }: RSSFeedItemProps) => {
  const [confirm] = useIonAlert()
  const { deleteRSSAddress, addNewRSSAddress } = useContext(RSSFeedContext)
  const { t } = useTranslation()

  const deleteRSSAddressInternal = () => {
    confirm({
      header: t('options.rssDeleteModal.header', { name: rss.name }),
      message: t('options.rssDeleteModal.message', { url: rss.url }),
      buttons: [
        t('options.rssDeleteModal.cancel'),
        {
          text: t('options.rssDeleteModal.delete'),
          handler: () => deleteRSSAddress(rss.id),
        },
      ],
    })
  }

  const duplicateRSSAddress = () => {
    addNewRSSAddress({ ...rss, id: uuidv4() })
  }

  return (
    <IonItemSliding>
      <IonItem>
        <IonButtons slot="end">
          <IonButton onClick={onItemSelect}>
            <IonIcon slot="icon-only" icon={buildOutline} />
          </IonButton>
          <IonButton onClick={deleteRSSAddressInternal}>
            <IonIcon slot="icon-only" icon={trashOutline} />
          </IonButton>
        </IonButtons>
        <IonLabel>
          <h2>{rss.name}</h2>
          <p>{rss.url}</p>
        </IonLabel>
        <IonReorder slot="start" />
      </IonItem>
      <IonItemOptions side="start">
        <IonItemOption color="danger" onClick={deleteRSSAddressInternal}>
          {t('options.delete')}
        </IonItemOption>
      </IonItemOptions>
      <IonItemOptions side="end">
        <IonItemOption color="secondary" onClick={duplicateRSSAddress}>
          {t('options.duplicate')}
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}
