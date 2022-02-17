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
import NewsTab from './pages/NewsTab'
import OptionsTab from './pages/OptionsTab'

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
import { categoryOptions } from './config/constants'

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/:tab(news)/:category" component={NewsTab} />
          <Route exact path="/:tab(options)" component={OptionsTab} />
          <Redirect to="/news/general" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          {Object.keys(categoryOptions).map((key) => {
            const [name, icon] = categoryOptions[key]

            return (
              <IonTabButton key={key} tab={key} href={`/news/${key}`}>
                <IonIcon icon={icon} />
                <IonLabel>{name}</IonLabel>
              </IonTabButton>
            )
          })}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)

export default App
