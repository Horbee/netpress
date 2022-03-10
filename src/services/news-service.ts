import axios from 'axios'
import { QueryFunction } from 'react-query'

import {
    DEFAULT_CATEGORY, DEFAULT_COUNTRY, newsEndpoints, rssAddressesEndpoint, rssConverterEndpoints
} from '../config/constants'
import { ArticlesResponse } from '../models/headlines-response'
import { RSSAddressesResponse } from '../models/rss-addresses-response'
import { FeedResponse } from '../models/rss-feed-data'

export const fetchRSSAddresses = async (country: string) => {
  const { data } = await axios.get<RSSAddressesResponse>(
    rssAddressesEndpoint + country
  )
  return data
}

export const fetchArticles = async (
  category: string = DEFAULT_CATEGORY,
  country: string = DEFAULT_COUNTRY,
  startIndex: number,
  endIndex: number
) => {
  const { data } = await axios.get<ArticlesResponse>(newsEndpoints, {
    params: { country, category, startIndex, endIndex },
  })
  return data
}

export const fetchRSSFeed = async (
  url: string,
  startIndex: number,
  endIndex: number
) => {
  const { data } = await axios.get<FeedResponse>(rssConverterEndpoints, {
    params: { url, startIndex, endIndex },
  })
  return data
}

export const infiniteFetchArticles: QueryFunction<
  ArticlesResponse,
  string[]
> = async ({ queryKey, pageParam }) => {
  const category = queryKey[1]
  const country = queryKey[2]
  const startIndex = pageParam?.startIndex ?? 0
  const endIndex = pageParam?.endIndex ?? 20

  return fetchArticles(category, country, startIndex, endIndex)
}

export const infiniteFetchRSSFeed: QueryFunction<
  FeedResponse,
  string[]
> = async ({ queryKey, pageParam }) => {
  const url = queryKey[1]
  const startIndex = pageParam?.startIndex ?? 0
  const endIndex = pageParam?.endIndex ?? 20

  return fetchRSSFeed(url, startIndex, endIndex)
}
