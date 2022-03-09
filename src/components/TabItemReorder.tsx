import React from 'react'
import { useTranslation } from 'react-i18next'

import { IonItem, IonLabel, IonReorder, IonReorderGroup } from '@ionic/react'

import { useTabCategory } from '../hooks/useTabCategory'
import { useTabCount } from '../hooks/useTabCount'

export const TabItemReorder: React.FC = () => {
  const { tabCount } = useTabCount()
  const { categories, doReorder } = useTabCategory()
  const { t } = useTranslation()

  return (
    <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
      {categories.map((item, index) => (
        <IonItem key={item.id} disabled={index >= tabCount}>
          <IonLabel>{t(`category.${item.id}`)}</IonLabel>
          <IonReorder slot="start" />
        </IonItem>
      ))}
    </IonReorderGroup>
  )
}
