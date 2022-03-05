import {
  InputChangeEventDetail,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

interface RSSAddressModalProps {
  isOpen: boolean
  onClose: () => void
  saveRSSAddress: () => void
  nameInputProps: {
    value: string
    onIonChange: (e: CustomEvent<InputChangeEventDetail>) => void
  }
  urlInputProps: {
    value: string
    onIonChange: (e: CustomEvent<InputChangeEventDetail>) => void
  }
}

export const RSSAddressModal = ({
  isOpen,
  onClose,
  saveRSSAddress,
  nameInputProps,
  urlInputProps,
}: RSSAddressModalProps) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>RSS Feed Hozzáadása</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Bezár</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Név</IonLabel>
            <IonInput {...nameInputProps}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Url</IonLabel>
            <IonInput {...urlInputProps}></IonInput>
          </IonItem>

          <IonButton onClick={saveRSSAddress}>Mentés</IonButton>
        </div>
      </IonContent>
    </IonModal>
  )
}
