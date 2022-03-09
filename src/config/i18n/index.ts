import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_COUNTRY } from '../constants'
import { enTranslation } from './en'
import { huTranslation } from './hu'

export const initI18n = (country: string) => {
  return i18n.use(initReactI18next).init({
    debug: true,
    lng: country || DEFAULT_COUNTRY,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      hu: {
        translation: huTranslation,
      },
    },
  })
}
