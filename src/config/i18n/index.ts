import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { enTranslation } from './en'
import { huTranslation } from './hu'

i18n.use(initReactI18next).init({
  debug: true,
  lng: localStorage.getItem('country') || 'hu',
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

export default i18n
