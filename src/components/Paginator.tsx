import "./Paginator.css";

import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import { Dispatch, SetStateAction } from "react";

import { IonButton, IonIcon } from "@ionic/react";

export interface PaginatorProps {
  hasPreviousPage: boolean
  hasNexPage: boolean
  hintText: string
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export const Paginator = ({
  hasPreviousPage,
  hasNexPage,
  hintText,
  setCurrentPage,
}: PaginatorProps) => {
  return (
    <div className="ion-padding paginator">
      {hasPreviousPage && (
        <IonButton onClick={() => setCurrentPage((prev) => prev - 1)}>
          <IonIcon slot="icon-only" icon={chevronBackOutline} />
        </IonButton>
      )}

      {hintText}

      {hasNexPage && (
        <IonButton onClick={() => setCurrentPage((prev) => prev + 1)}>
          <IonIcon slot="icon-only" icon={chevronForwardOutline} />
        </IonButton>
      )}
    </div>
  )
}
