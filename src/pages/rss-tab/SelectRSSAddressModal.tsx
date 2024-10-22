import { MutableRefObject, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import { closeOutline, addOutline } from 'ionicons/icons'

import { RSSFeedContext } from '../../context/RSSFeedContext'
import { RSSAddressDocument, RSSAddressesResponse } from '../../models/rss-addresses-response'

interface SelectRSSAddressModalProps {
  isLoading: boolean
  isOpen: boolean
  onClose: () => void
  selectRSSAddress: () => void
  rssAddressList?: RSSAddressesResponse
  isInList: (item: RSSAddressDocument) => boolean
  isSelected: (item: RSSAddressDocument) => boolean
  toggleSelection: (item: RSSAddressDocument) => void
  pageRef: MutableRefObject<HTMLElement | undefined>
}

export const SelectRSSAddressModal = ({
  isLoading,
  isOpen,
  onClose,
  selectRSSAddress,
  rssAddressList,
  isInList,
  isSelected,
  toggleSelection,
  pageRef,
}: SelectRSSAddressModalProps) => {
  const { t } = useTranslation()
  const { rssAddressList: localRssAddressList } = useContext(RSSFeedContext)

  const sortedList = useMemo(() => {
    return rssAddressList?.documents?.sort((a, b) => (isInList(a) ? 1 : -1))
  }, [rssAddressList, localRssAddressList])

  return (
    <IonModal isOpen={isOpen} presentingElement={pageRef.current} onIonModalDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle style={{ textAlign: 'center' }}>{t('rssTab.title')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={selectRSSAddress}>
              <IonIcon slot="icon-only" icon={addOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {sortedList ? (
          <IonList>
            {sortedList.map((address) => (
              <IonItem key={address.name} onClick={() => toggleSelection(address)}>
                <IonCheckbox slot="start" color="primary" checked={isSelected(address) || isInList(address)} onIonChange={() => toggleSelection(address)} />
                <IonLabel>
                  <h2>{address.fields.name.stringValue}</h2>
                  <p>{address.fields.url.stringValue}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <>
            {isLoading && (
              <div className="spinner-wrapper">
                <IonSpinner name="lines" color="primary" />
              </div>
            )}
          </>
        )}
      </IonContent>
    </IonModal>
  )
}
