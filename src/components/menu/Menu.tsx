import './Menu.css'

import {
  logoGithub,
  logoRss,
  newspaperOutline,
  settingsOutline,
} from 'ionicons/icons'
import { useLocation } from 'react-router-dom'

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react'

import { useTabCategory } from '../../hooks/useTabCategory'

interface AppPage {
  url: string
  title: string
  icon: string
}

const appPages = (firstTab: string): AppPage[] => [
  {
    title: 'News',
    url: '/news/' + firstTab,
    icon: newspaperOutline,
  },
  {
    title: 'RSS Feed',
    url: '/rss',
    icon: logoRss,
  },
  {
    title: 'Options',
    url: '/options',
    icon: settingsOutline,
  },
]

export const Menu: React.FC = () => {
  const location = useLocation()
  const { categories } = useTabCategory()

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="menu-list">
          <IonListHeader>NetPress</IonListHeader>
          {appPages(categories[0].id).map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? 'selected' : ''
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}
        </IonList>

        <IonList id="menu-footer">
          <IonItem
            lines="none"
            onClick={() =>
              window.open(
                'https://github.com/Horbee/ionic-react-news',
                '_system',
                'location=yes'
              )
            }
          >
            <IonIcon icon={logoGithub} slot="end"></IonIcon>
            <IonLabel>v1.0.0</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}
