import { logoRss, settingsOutline } from 'ionicons/icons'
import { useEffect, useRef } from 'react'


import {
    IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRefresher,
    IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail, useIonRouter
} from '@ionic/react'

import type { ReactNode } from 'react'

interface ArticlePageLayoutProps {
  title: string
  refreshFunction: (e: CustomEvent<RefresherEventDetail>) => Promise<void>
  virtuosoRef: any
  scrolledToTop: boolean
  children: ReactNode
}

export const ArticlePageLayout = ({
  children,
  title,
  refreshFunction,
  virtuosoRef,
  scrolledToTop,
}: ArticlePageLayoutProps) => {
  const router = useIonRouter()
  const contentRef = useRef<HTMLIonContentElement>(null)

  const onRSSPage = router.routeInfo.pathname === '/rss'

  useEffect(() => {
    const handleScrollToTop = (e: any) => {
      if (e.detail.selected) {
        contentRef.current?.scrollToTop(500)
        virtuosoRef.current?.scrollToIndex({
          index: 0,
          behavior: 'smooth',
        })
      }
    }
    window.addEventListener('ionTabButtonClick', handleScrollToTop)

    return () => {
      window.removeEventListener('ionTabButtonClick', handleScrollToTop)
    }
  }, [virtuosoRef])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              color={onRSSPage ? 'primary' : ''}
              onClick={() => {
                router.push('/rss')
                if (onRSSPage) {
                  contentRef.current?.scrollToTop(500)
                  virtuosoRef.current?.scrollToIndex({
                    index: 0,
                    align: 'end',
                    behavior: 'smooth',
                  })
                }
              }}
            >
              <IonIcon icon={logoRss}></IonIcon>
            </IonButton>
            <IonButton onClick={() => router.push('/options')}>
              <IonIcon icon={settingsOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen ref={contentRef}>
        <IonRefresher
          slot="fixed"
          onIonRefresh={refreshFunction}
          disabled={!scrolledToTop}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {children}
      </IonContent>
    </IonPage>
  )
}
