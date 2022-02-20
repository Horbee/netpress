import {
    basketballOutline, happyOutline, hardwareChipOutline, heartOutline, homeOutline, schoolOutline,
    walletOutline
} from "ionicons/icons";

// API KEY for news API
export const API_KEY = process.env.REACT_APP_NEWS_API_KEY ?? ''

export const DEFAULT_COUNTRY = localStorage.getItem('lastCountry') || 'hu'
export const DEFAULT_CATEGORY = 'general'

export const contryOptions = ['hu', 'de', 'gb', 'in']

export type CategoryOption = { id: string; name: string; icon: string }

export const categoryOptions: CategoryOption[] = [
  { id: 'business', name: 'Üzlet', icon: walletOutline },
  { id: 'entertainment', name: 'Szórakozás', icon: happyOutline },
  { id: 'general', name: 'Általános', icon: homeOutline },
  { id: 'health', name: 'Egészség', icon: heartOutline },
  { id: 'science', name: 'Tudomány', icon: schoolOutline },
  { id: 'sports', name: 'Sport', icon: basketballOutline },
  { id: 'technology', name: 'Tech', icon: hardwareChipOutline },
]

export const newsEndpoints =
  process.env.REACT_APP_NEWS_API ?? 'https://newsapi.org/v2/top-headlines'
export const rssConverterEndpoints =
  process.env.REACT_APP_RSS_CONVERTER_API ?? 'http://localhost:8080/api/feed'
