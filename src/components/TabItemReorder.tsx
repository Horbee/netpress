import React, { useState } from 'react'
import { IonItem, IonLabel, IonReorder, IonReorderGroup } from '@ionic/react'
import { categoryOptions } from '../config/constants'

export const TabItemReorder: React.FC = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5])

  function doReorder(event: CustomEvent) {
    setItems(event.detail.complete(items))
    console.log('After complete', items)
  }

  return (
    <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
      {/* {Object.values(categoryOptions).map(([name]) => (
        <IonItem>
          <IonLabel>{name}</IonLabel>
          <IonReorder slot="start" />
        </IonItem>
      ))} */}
      {items.map((it) => (
        <IonItem>
          <IonLabel>{it}</IonLabel>
          <IonReorder slot="start" />
        </IonItem>
      ))}
    </IonReorderGroup>
  )
}
