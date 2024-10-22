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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import '@ionic/react/css/palettes/dark.class.css'
// import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'

import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Menu } from './components/menu/Menu'
import { useTabCategory } from './hooks/useTabCategory'
import { CountryPicker } from './components/country-picker/CountryPicker'
import NewsTab from './pages/news/NewsPage'
import OptionsPage from './pages/options/OptionsPage'
import RSSTab from './pages/rss-tab/RSSTab'

setupIonicReact()

const App: React.FC = () => {
  const { categories } = useTabCategory()

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route exact path="/news/:category" component={NewsTab} />
            <Route exact path="/rss" component={RSSTab} />
            <Route exact path="/options" component={OptionsPage} />
            <Route exact path="/">
              <Redirect to={`/news/${categories[0].id}`} />
            </Route>
            <Route>
              <Redirect to={`/news/${categories[0].id}`} />
            </Route>
          </IonRouterOutlet>
          <CountryPicker />
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
