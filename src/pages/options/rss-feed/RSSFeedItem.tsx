import { buildOutline, trashOutline } from "ionicons/icons";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import {
    IonButton, IonButtons, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
    IonLabel, IonReorder, useIonAlert
} from "@ionic/react";

import { RSSFeedContext } from "../../../context/RSSFeedContext";
import { RSSFeedAddress } from "../../../models/rss-feed-data";

interface RSSFeedItemProps {
  rss: RSSFeedAddress
  onItemSelect: () => void
}

export const RSSFeedItem = ({ rss, onItemSelect }: RSSFeedItemProps) => {
  const [confirm] = useIonAlert()
  const { deleteRSSAddress, addNewRSSAddress } = useContext(RSSFeedContext)

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

  const duplicateRSSAddress = () => {
    addNewRSSAddress({ ...rss, id: uuidv4() })
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
        <IonReorder slot="start" />
      </IonItem>
      <IonItemOptions side="start">
        <IonItemOption color="danger" onClick={deleteRSSAddressInternal}>
          Töröl
        </IonItemOption>
      </IonItemOptions>
      <IonItemOptions side="end">
        <IonItemOption color="secondary" onClick={duplicateRSSAddress}>
          Duplikál
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}
