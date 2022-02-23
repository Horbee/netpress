import { logoRss, settingsOutline } from 'ionicons/icons'
import { FC } from 'react'

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonRouter,
} from '@ionic/react'

interface ArticlePageLayoutProps {
  title: string
  refreshFunction: (e: CustomEvent<RefresherEventDetail>) => Promise<void>
}

export const ArticlePageLayout: FC<ArticlePageLayoutProps> = ({
  children,
  title,
  refreshFunction,
}) => {
  const router = useIonRouter()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => router.push('/rss')}>
              <IonIcon icon={logoRss}></IonIcon>
            </IonButton>
            <IonButton onClick={() => router.push('/options')}>
              <IonIcon icon={settingsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={refreshFunction}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {children}
      </IonContent>
    </IonPage>
  )
}
