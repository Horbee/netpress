/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
/* Theme variables */
import './theme/variables.css'

import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { MenuTabContext } from './context/MenuTabContext'
import NewsTab from './pages/NewsTab'
import OptionsTab from './pages/options/OptionsTab'
import RSSTab from './pages/rss-tab/RSSTab'

setupIonicReact()

const App: React.FC = () => {
  const {
    tabCategoryHook: { categories },
    tabCountHook: { tabCount },
  } = useContext(MenuTabContext)

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/:tab(news)/:category" component={NewsTab} />
            <Route exact path="/:tab(rss)" component={RSSTab} />
            <Route exact path="/:tab(options)" component={OptionsTab} />
            <Route exact path="/">
              <Redirect to={`/news/${categories[0].id}`} />
            </Route>
            <Route>
              <Redirect to={`/news/${categories[0].id}`} />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {categories.slice(0, tabCount).map(({ id, name, icon }) => (
              <IonTabButton key={id} tab={`/news/${id}`} href={`/news/${id}`}>
                <IonIcon icon={icon} />
                <IonLabel>{name}</IonLabel>
              </IonTabButton>
            ))}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
