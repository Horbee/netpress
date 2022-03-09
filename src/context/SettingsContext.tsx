import { createContext, FC, useContext, useEffect, useState } from 'react'

import { DEFAULT_COUNTRY } from '../config/constants'
import { initI18n } from '../config/i18n'
import { useStorage } from './StorageContext'

type SettingsContextType = {
  settings: SettingsState
  saveDarkTheme: (darkTheme: boolean) => void
  saveCountry: (country: string) => void
}

type SettingsState = {
  darkTheme: boolean
  country: string
}

export const SettingsContext = createContext<SettingsContextType>(
  undefined as any
)

export const SettingsContextProvider: FC = ({ children }) => {
  const { get, save, storage } = useStorage()
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<SettingsState>({
    darkTheme: false,
    country: DEFAULT_COUNTRY,
  })

  useEffect(() => {
    if (storage) initSettings()
  }, [storage])

  const initSettings = async () => {
    const [darkTheme, country] = await Promise.all([
      get('darkTheme'),
      get('country'),
    ])
    setSettings({ darkTheme, country: country ?? DEFAULT_COUNTRY })
    initI18n(country)
    setLoading(false)
  }

  const saveDarkTheme = (darkTheme: boolean) => {
    setSettings((prev) => ({ ...prev, darkTheme }))
    save('darkTheme', darkTheme)
  }

  const saveCountry = (country: string) => {
    setSettings((prev) => ({ ...prev, country }))
    save('country', country)
  }

  useEffect(() => {
    if (settings.darkTheme) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [settings.darkTheme])

  return (
    <SettingsContext.Provider value={{ settings, saveDarkTheme, saveCountry }}>
      {!loading && children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  return useContext(SettingsContext)
}
