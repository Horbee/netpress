import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import {
  RSSAddressDocument,
  RSSAddressesResponse,
} from '../../models/rss-addresses-response'

interface SelectRSSAddressModalProps {
  isLoading: boolean
  isOpen: boolean
  onClose: () => void
  selectRSSAddress: () => void
  rssAddressList?: RSSAddressesResponse
  isInList: (item: RSSAddressDocument) => boolean
  isSelected: (item: RSSAddressDocument) => boolean
  toggleSelection: (item: RSSAddressDocument) => void
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
}: SelectRSSAddressModalProps) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>RSS Hírcsatornák</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Bezár</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {rssAddressList ? (
          <IonList>
            {rssAddressList.documents
              .sort((a, b) => (isInList(a) ? 1 : -1))
              .map((address) => (
                <IonItem key={address.name} disabled={isInList(address)}>
                  <IonCheckbox
                    slot="start"
                    color="primary"
                    checked={isSelected(address) || isInList(address)}
                    onIonChange={() => toggleSelection(address)}
                  />
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

        <div className="ion-padding">
          <IonButton onClick={selectRSSAddress}>Hozzáadás</IonButton>
        </div>
      </IonContent>
    </IonModal>
  )
}
