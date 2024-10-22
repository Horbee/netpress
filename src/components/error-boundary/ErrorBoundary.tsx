import './ErrorBoundary.css'

import { IonContent, IonPage, IonText } from '@ionic/react'

import errorImage from '../../images/undraw_server_down.svg'
import { sendErrorLog } from '../../services/news-service'

import { Component, PropsWithChildren } from 'react'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<PropsWithChildren<{}>, State> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service

    sendErrorLog(JSON.stringify(errorInfo), JSON.stringify(error, Object.getOwnPropertyNames(error)))
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <IonPage>
          <IonContent fullscreen className="ion-padding">
            <div className="error-boundary">
              <img src={errorImage} alt="Error" />
              <IonText>
                <h2>Something went wrong.</h2>
                <p>Please restart the application.</p>
              </IonText>
            </div>
          </IonContent>
        </IonPage>
      )
    }

    return this.props.children
  }
}
