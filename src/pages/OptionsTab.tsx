import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react'
import { moonOutline } from 'ionicons/icons'
import { useState } from 'react'
import { TabItemReorder } from '../components/TabItemReorder'
import { contryOptions, DEFAULT_COUNTRY } from '../config/constants'
import { useDarkMode } from '../hooks/useDarkMode'
import './OptionsTab.css'

const OptionsTab: React.FC = () => {
  const { toggle, active } = useDarkMode()
  const [country, setCountry] = useState(DEFAULT_COUNTRY)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/news/general" />
          </IonButtons>
          <IonTitle>Beállítások</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Beállítások</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <IonItem>
            <IonLabel>Ország</IonLabel>
            <IonSelect
              interface="popover"
              value={country}
              placeholder="Select One"
              onIonChange={(e) => setCountry(e.detail.value)}
            >
              {contryOptions.map((opt) => (
                <IonSelectOption value={opt}>{opt}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Sötét téma</IonLabel>
            <IonToggle checked={active} onIonChange={toggle} />
          </IonItem>
          <TabItemReorder />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default OptionsTab
