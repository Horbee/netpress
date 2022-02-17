import {
  basketballOutline,
  heartOutline,
  hardwareChipOutline,
  schoolOutline,
  homeOutline,
  happyOutline,
  walletOutline,
} from 'ionicons/icons'

// API KEY for news API
export const API_KEY = process.env.REACT_APP_NEWS_API_KEY ?? ''

export const DEFAULT_COUNTRY = localStorage.getItem('lastCountry') || 'hu'
export const DEFAULT_CATEGORY = 'general'

export const contryOptions = ['hu', 'de', 'gb', 'in']

type CategoryOptions = {
  [key: string]: [string, string]
}

export const categoryOptions: CategoryOptions = {
  business: ['Üzlet', walletOutline],
  entertainment: ['Szórakozás', happyOutline],
  general: ['Általános', homeOutline],
  health: ['Egészség', heartOutline],
  science: ['Tudomány', schoolOutline],
  sports: ['Sport', basketballOutline],
  technology: ['Tech', hardwareChipOutline],
}

export const newsEndpoints = 'https://newsapi.org/v2/top-headlines'
