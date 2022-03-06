import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { IonItem, IonLabel, IonReorder, IonReorderGroup } from '@ionic/react'

import { MenuTabContext } from '../context/MenuTabContext'

export const TabItemReorder: React.FC = () => {
  const {
    tabCategoryHook: { categories, doReorder },
    tabCountHook: { tabCount },
  } = useContext(MenuTabContext)
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
