import {
    basketballOutline, happyOutline, hardwareChipOutline, heartOutline, homeOutline, schoolOutline,
    walletOutline
} from 'ionicons/icons'

export const DEFAULT_COUNTRY = 'hu'
export const DEFAULT_CATEGORY = 'general'

export const contryOptions = ['hu', 'de', 'gb', 'in']

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

export const newsEndpoints =
  process.env.REACT_APP_NEWS_API ?? 'https://newsapi.org/v2/top-headlines'
export const rssConverterEndpoints =
  process.env.REACT_APP_RSS_CONVERTER_API ?? 'http://localhost:8080/api/feed'
export const rssAddressesEndpoint = process.env.REACT_APP_RSS_ADDRESSES ?? ''
