import { InputChangeEventDetail, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'

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
  pageRef: MutableRefObject<HTMLElement | undefined>
}

export const RSSAddressModal = ({ isOpen, onClose, saveRSSAddress, nameInputProps, urlInputProps, pageRef }: RSSAddressModalProps) => {
  const { t } = useTranslation()

  const isInvalid = !nameInputProps.value.trim() || !urlInputProps.value.trim()

  return (
    <IonModal isOpen={isOpen} onIonModalDidDismiss={onClose} presentingElement={pageRef.current}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{t('options.rssAddModal.header')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonList>
            <IonItem>
              <IonInput label={t('options.rssAddModal.nameField')} labelPlacement="floating" {...nameInputProps}></IonInput>
            </IonItem>

            <IonItem>
              <IonInput label={t('options.rssAddModal.urlField')} labelPlacement="floating" {...urlInputProps}></IonInput>
            </IonItem>
          </IonList>

          <IonButton onClick={saveRSSAddress} disabled={isInvalid}>
            {t('options.rssAddModal.save')}
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  )
}
