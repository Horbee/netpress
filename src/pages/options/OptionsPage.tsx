import { logoGithub, moonOutline } from 'ionicons/icons'
import { useTranslation } from 'react-i18next'

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react'

import { TabItemReorder } from '../../components/TabItemReorder'
import { countryOptions } from '../../config/constants'
import { useCountry } from '../../hooks/useCountry'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useTabCount } from '../../hooks/useTabCount'
import { RSSFeedSection } from './rss-feed/RSSFeedSection'
import { useRef } from 'react'

const OptionsPage = () => {
  const { tabCount, rangeProps } = useTabCount()
  const { darkTheme: active, toggle } = useDarkMode()
  const { country, setCountry } = useCountry()

  const pageRef = useRef<HTMLElement>()

  const { t } = useTranslation()

  return (
    <>
      <IonPage ref={pageRef}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => window.open('https://github.com/Horbee/netpress', '_system', 'location=yes')}>
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
              <IonSelect slot="end" value={country} onIonChange={(e) => setCountry(e.detail.value)} okText={t('options.select')} cancelText={t('options.back')}>
                {countryOptions.map((opt) => (
                  <IonSelectOption key={opt} value={opt}>
                    {opt}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonIcon icon={moonOutline} slot="start" />
              <IonLabel>{t('options.darkTheme')}</IonLabel>
              <IonToggle checked={active} onIonChange={toggle} slot="end" />
            </IonItem>

            <IonItemDivider>{t('options.iconCount')}</IonItemDivider>
            <IonItem>
              <IonRange color="secondary" step={1} snaps {...rangeProps}>
                <IonLabel slot="start">{tabCount}</IonLabel>
              </IonRange>
            </IonItem>

            <TabItemReorder />

            <RSSFeedSection pageRef={pageRef} />
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}

export default OptionsPage
