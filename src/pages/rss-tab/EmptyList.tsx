import './EmptyList.css'

import { useTranslation } from 'react-i18next'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'

interface EmptyListProps {
  openRSSModal: () => void
}

export const EmptyList = ({ openRSSModal }: EmptyListProps) => {
  const { t } = useTranslation()

  return (
    <IonCard className="empty-list-card">
      <IonCardHeader>
        <IonCardTitle>{t('rssTab.emptyList.title')}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>{t('rssTab.emptyList.content')}</IonCardContent>

      <IonButton fill="clear" onClick={openRSSModal}>
        {t('rssTab.add')}
      </IonButton>
    </IonCard>
  )
}
