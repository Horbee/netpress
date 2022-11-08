import { createContext, useContext, useEffect, useState } from 'react'


import {
    CategoryOption, categoryOptions, DEFAULT_COUNTRY, DEFAULT_TABCOUNT
} from '../config/constants'
import { initI18n } from '../config/i18n'
import { RSSFeedAddress } from '../models/rss-feed-data'
import { useStorage } from './StorageProvider'

import type { ReactNode } from 'react'

type SettingsState = {
  darkTheme: boolean
  country: string
  rssAddressList: RSSFeedAddress[]
  tabCount: number
  categories: CategoryOption[]
}

const SettingsContext = createContext<
  | {
      settings: SettingsState
      saveDarkTheme: (darkTheme: boolean) => void
      saveCountry: (country: string) => void
      saveRSSAddressList: (rssAddressList: RSSFeedAddress[]) => void
      saveTabCount: (tabCount: number) => void
      saveCategories: (categories: CategoryOption[]) => void
    }
  | undefined
>(undefined)

const prefersDarkTheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { get, save, storage } = useStorage()
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<SettingsState>({
    darkTheme: false,
    country: DEFAULT_COUNTRY,
    rssAddressList: [],
    tabCount: DEFAULT_TABCOUNT,
    categories: categoryOptions,
  })

  useEffect(() => {
    const initSettings = async () => {
      const [darkTheme, country, rssAddressList, tabCount, categories] =
        await Promise.all([
          get('darkTheme'),
          get('country'),
          get('RSSAddressList'),
          get('tabCount'),
          get('categoryOrder'),
        ])
      setSettings({
        darkTheme: darkTheme ?? prefersDarkTheme ?? false,
        country: country ?? DEFAULT_COUNTRY,
        rssAddressList: rssAddressList ?? [],
        tabCount: tabCount ?? DEFAULT_TABCOUNT,
        categories: categories ?? categoryOptions,
      })
      initI18n(country)
      setLoading(false)
    }

    if (storage) initSettings()
  }, [storage, get])

  const saveDarkTheme = (darkTheme: boolean) => {
    setSettings((prev) => ({ ...prev, darkTheme }))
    save('darkTheme', darkTheme)
  }

  const saveCountry = (country: string) => {
    setSettings((prev) => ({ ...prev, country }))
    save('country', country)
  }

  const saveRSSAddressList = (rssAddressList: RSSFeedAddress[]) => {
    setSettings((prev) => ({ ...prev, rssAddressList }))
    save('RSSAddressList', rssAddressList)
  }

  const saveTabCount = (tabCount: number) => {
    setSettings((prev) => ({ ...prev, tabCount }))
    save('tabCount', tabCount)
  }

  const saveCategories = (categories: CategoryOption[]) => {
    setSettings((prev) => ({ ...prev, categories }))
    save('categoryOrder', categories)
  }

  useEffect(() => {
    if (settings.darkTheme) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [settings.darkTheme])

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveDarkTheme,
        saveCountry,
        saveRSSAddressList,
        saveTabCount,
        saveCategories,
      }}
    >
      {!loading && children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext)
  if (ctx === undefined) {
    throw new Error('useSettings must be used within a SettingsContextProvider')
  }

  return ctx
}
