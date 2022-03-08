import { createContext, FC, useContext, useEffect, useState } from 'react'

import { useStorage } from './StorageContext'

type SettingsContextType = {
  settings: SettingsState
  saveDarkTheme: (darkTheme: boolean) => void
}

type SettingsState = {
  darkTheme: boolean
}

export const SettingsContext = createContext<SettingsContextType>(
  undefined as any
)

export const SettingsContextProvider: FC = ({ children }) => {
  const { get, save, storage } = useStorage()
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<SettingsState>({ darkTheme: false })

  useEffect(() => {
    if (storage) initSettings()
  }, [storage])

  const initSettings = async () => {
    const [darkTheme] = await Promise.all([get('darkTheme')])
    setSettings({ darkTheme })
    setLoading(false)
  }

  const saveDarkTheme = (darkTheme: boolean) => {
    setSettings((prev) => ({ ...prev, darkTheme }))
    save('darkTheme', darkTheme)
  }

  return (
    <SettingsContext.Provider value={{ settings, saveDarkTheme }}>
      {!loading && children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  return useContext(SettingsContext)
}
