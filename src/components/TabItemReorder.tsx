import React, { useContext } from 'react'

import { IonItem, IonLabel, IonReorder, IonReorderGroup } from '@ionic/react'

import { MenuTabContext } from '../context/MenuTabContext'

export const TabItemReorder: React.FC = () => {
  const {
    tabCategoryHook: { categories, doReorder },
    tabCountHook: { tabCount },
  } = useContext(MenuTabContext)

  return (
    <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
      {categories.map((item, index) => (
        <IonItem key={item.id} disabled={index >= tabCount}>
          <IonLabel>{item.name}</IonLabel>
          <IonReorder slot="start" />
        </IonItem>
      ))}
    </IonReorderGroup>
  )
}
