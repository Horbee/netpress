import { addOutline } from "ionicons/icons";
import { useContext } from "react";

import { IonButton, IonButtons, IonIcon, IonItemDivider, IonList } from "@ionic/react";

import { RSSFeedContext } from "../../../context/RSSFeedContext";
import { RSSAddressModal } from "./RSSAddressModal";
import { RSSFeedItem } from "./RSSFeedItem";
import { useRSSAddressModal } from "./useRSSAddressModal";

export const RSSFeedSection = () => {
  const { rssAddressList } = useContext(RSSFeedContext)
  const { openRSSModal, modalProps } = useRSSAddressModal()

  return (
    <>
      <RSSAddressModal {...modalProps} />
      <IonItemDivider>
        <IonButtons slot="end">
          <IonButton onClick={() => openRSSModal()}>
            <IonIcon slot="icon-only" icon={addOutline} />
          </IonButton>
        </IonButtons>
        RSS Feed lista
      </IonItemDivider>
      <IonList>
        {rssAddressList.map((rss) => (
          <RSSFeedItem
            key={rss.id}
            rss={rss}
            onItemSelect={() => openRSSModal(rss)}
          />
        ))}
      </IonList>
    </>
  )
}
