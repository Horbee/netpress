import { buildOutline, trashOutline } from "ionicons/icons";
import { useContext } from "react";

import {
    IonButton, IonButtons, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
    IonLabel, useIonAlert
} from "@ionic/react";

import { RSSFeedContext } from "../../../context/RSSFeedContext";
import { RSSFeedAddress } from "../../../models/rss-feed-data";

interface RSSFeedItemProps {
  rss: RSSFeedAddress
  onItemSelect: () => void
}

export const RSSFeedItem = ({ rss, onItemSelect }: RSSFeedItemProps) => {
  const [confirm] = useIonAlert()
  const { deleteRSSAddress } = useContext(RSSFeedContext)

  const deleteRSSAddressInternal = () => {
    confirm({
      header: `Törlés: ${rss.name}`,
      message:
        'Biztos vagy benne hogy törölni szeretnéd ezt az RSS címet? ' + rss.url,
      buttons: [
        'Mégsem',
        { text: 'Töröl', handler: () => deleteRSSAddress(rss.id) },
      ],
    })
  }

  return (
    <IonItemSliding>
      <IonItem>
        <IonButtons slot="end">
          <IonButton onClick={onItemSelect}>
            <IonIcon slot="icon-only" icon={buildOutline} />
          </IonButton>
          <IonButton onClick={deleteRSSAddressInternal}>
            <IonIcon slot="icon-only" icon={trashOutline} />
          </IonButton>
        </IonButtons>
        <IonLabel>
          <h2>{rss.name}</h2>
          <p>{rss.url}</p>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="start">
        <IonItemOption color="danger" onClick={deleteRSSAddressInternal}>
          Töröl
        </IonItemOption>
      </IonItemOptions>
      <IonItemOptions side="end">
        <IonItemOption color="warning" onClick={onItemSelect}>
          Szerkeszt
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}
