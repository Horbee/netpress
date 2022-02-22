import axios from 'axios'

import {
  DEFAULT_CATEGORY,
  DEFAULT_COUNTRY,
  newsEndpoints,
  rssConverterEndpoints,
} from '../config/constants'
import { ArticlesResponse } from '../models/headlines-response'
import { FeedResponse } from '../models/rss-feed-data'

export const fetchArticles = async (
  category: string = DEFAULT_CATEGORY,
  country: string = DEFAULT_COUNTRY
) => {
  const { data } = await axios.get<ArticlesResponse>(
    `${newsEndpoints}?country=${country}&category=${category}`
  )
  return data
}

export const fetchRSSFeed = async (url: string) => {
  const { data } = await axios.get<FeedResponse>(
    `${rssConverterEndpoints}?url=${url}`
  )
  return data
}
