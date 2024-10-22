import { basketballOutline, happyOutline, hardwareChipOutline, heartOutline, homeOutline, schoolOutline, walletOutline } from 'ionicons/icons'

export const DEFAULT_COUNTRY = 'hu'
export const DEFAULT_CATEGORY = 'general'
export const DEFAULT_TABCOUNT = 4
export const APP_VERSION = import.meta.env.VITE_VERSION

export const countryOptions = ['hu', 'de', 'gb', 'in']

export type CategoryOption = { id: string; icon: string }

export const categoryOptions: CategoryOption[] = [
  { id: 'business', icon: walletOutline },
  { id: 'entertainment', icon: happyOutline },
  { id: 'general', icon: homeOutline },
  { id: 'health', icon: heartOutline },
  { id: 'science', icon: schoolOutline },
  { id: 'sports', icon: basketballOutline },
  { id: 'technology', icon: hardwareChipOutline },
]

export const newsEndpoints = import.meta.env.VITE_NEWS_API ?? 'http://localhost:9999/.netlify/functions/news'

export const rssConverterEndpoints = import.meta.env.VITE_RSS_CONVERTER_API ?? 'http://localhost:9999/.netlify/functions/feed'

export const logErrorEndpoints = import.meta.env.VITE_LOG_ERROR_API ?? 'http://localhost:9999/.netlify/functions/log-error'

export const rssAddressesEndpoint = import.meta.env.VITE_RSS_ADDRESSES ?? ''
