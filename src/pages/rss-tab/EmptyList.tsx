import { useTranslation } from 'react-i18next'

import { IonButton, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react'

interface EmptyListProps {
  openRSSModal: () => void
}

export const EmptyList = ({ openRSSModal }: EmptyListProps) => {
  const { t } = useTranslation()

  return (
    <div className="ion-padding">
      <IonCard className="spinner-wrapper">
        <IonCardHeader className="rss-warning">
          <IonCardTitle>{t('rssTab.emptyList')}</IonCardTitle>
          <IonButton onClick={openRSSModal}>{t('rssTab.add')}</IonButton>
        </IonCardHeader>
      </IonCard>
    </div>
  )
}
