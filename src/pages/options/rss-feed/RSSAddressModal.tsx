import { useTranslation } from 'react-i18next'

import {
    InputChangeEventDetail, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem,
    IonLabel, IonModal, IonTitle, IonToolbar
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
  const { t } = useTranslation()

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{t('options.rssAddModal.header')}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              {t('options.rssAddModal.close')}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonItem>
            <IonLabel position="floating">
              {t('options.rssAddModal.nameField')}
            </IonLabel>
            <IonInput {...nameInputProps}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">
              {t('options.rssAddModal.urlField')}
            </IonLabel>
            <IonInput {...urlInputProps}></IonInput>
          </IonItem>

          <IonButton onClick={saveRSSAddress}>
            {t('options.rssAddModal.save')}
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  )
}
