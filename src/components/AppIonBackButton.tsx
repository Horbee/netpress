import { useTranslation } from 'react-i18next'

import { IonBackButton } from '@ionic/react'

export const AppIonBackButton = () => {
  const { t } = useTranslation()

  return <IonBackButton text={t('options.back')} />
}
