import './OptionsTab.css'

import { logoGithub, moonOutline } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'

import {
    IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel,
    IonPage, IonRange, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar
} from '@ionic/react'

import { AppIonBackButton } from '../../components/AppIonBackButton'
import { TabItemReorder } from '../../components/TabItemReorder'
import { contryOptions } from '../../config/constants'
import { useCountry } from '../../hooks/useCountry'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useTabCount } from '../../hooks/useTabCount'
import { RSSFeedSection } from './rss-feed/RSSFeedSection'

const OptionsTab: React.FC = () => {
  const { tabCount, rangeProps } = useTabCount()
  const { darkTheme: active, toggle } = useDarkMode()
  const { country, setCountry } = useCountry()

  const { t } = useTranslation()

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <AppIonBackButton />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                onClick={() =>
                  window.open(
                    'https://github.com/Horbee/ionic-react-news',
                    '_system',
                    'location=yes'
                  )
                }
              >
                <IonIcon icon={logoGithub}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>{t('options.title')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{t('options.title')}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div className="ion-padding">
            <IonItem>
              <IonLabel>{t('options.country')}</IonLabel>
              <IonSelect
                value={country}
                onIonChange={(e) => setCountry(e.detail.value)}
                okText={t('options.select')}
                cancelText={t('options.back')}
              >
                {contryOptions.map((opt) => (
                  <IonSelectOption key={opt} value={opt}>
                    {opt}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonIcon icon={moonOutline} slot="start" />
              <IonLabel>{t('options.darkTheme')}</IonLabel>
              <IonToggle checked={active} onIonChange={toggle} />
            </IonItem>

            <IonItemDivider>{t('options.iconCount')}</IonItemDivider>
            <IonItem>
              <IonRange color="secondary" step={1} snaps {...rangeProps}>
                <IonLabel slot="start">{tabCount}</IonLabel>
              </IonRange>
            </IonItem>

            <TabItemReorder />

            <RSSFeedSection />
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}

export default OptionsTab
