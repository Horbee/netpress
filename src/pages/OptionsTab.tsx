import "./OptionsTab.css";

import { moonOutline } from "ionicons/icons";
import { useContext, useState } from "react";

import {
    IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel,
    IonPage, IonRange, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar
} from "@ionic/react";

import { TabItemReorder } from "../components/TabItemReorder";
import { contryOptions, DEFAULT_COUNTRY } from "../config/constants";
import { DarkModeContext } from "../context/DarkModeContext";
import { MenuTabContext } from "../context/MenuTabContext";

const OptionsTab: React.FC = () => {
  const [country, setCountry] = useState(DEFAULT_COUNTRY)
  const {
    tabCountHook: { rangeProps, tabCount },
  } = useContext(MenuTabContext)
  const {
    darkModeHook: { active, toggle },
  } = useContext(DarkModeContext)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
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
              placeholder="Válassz"
              onIonChange={(e) => setCountry(e.detail.value)}
            >
              {contryOptions.map((opt) => (
                <IonSelectOption key={opt} value={opt}>
                  {opt}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Sötét téma</IonLabel>
            <IonToggle checked={active} onIonChange={toggle} />
          </IonItem>

          <IonItemDivider>Menü ikonok száma</IonItemDivider>
          <IonItem>
            <IonRange color="secondary" step={1} snaps {...rangeProps}>
              <IonLabel slot="start">{tabCount}</IonLabel>
            </IonRange>
          </IonItem>

          <TabItemReorder />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default OptionsTab
