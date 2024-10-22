import { useTranslation } from 'react-i18next'

import { useSettings } from '../context/SettingsContext'

export const useCountry = () => {
  const {
    settings: { country },
    saveCountry,
  } = useSettings()

  const { i18n } = useTranslation()

  const setCountryInternal = (country: string) => {
    saveCountry(country)
    i18n.changeLanguage(country)
  }

  return {
    country,
    setCountry: setCountryInternal,
  }
}
