import axios from "axios";

import { API_KEY, DEFAULT_CATEGORY, DEFAULT_COUNTRY, newsEndpoints } from "../config/constants";
import { ArticlesResponse } from "../models/headlines-response";

export const fetchArticles = async (
  category: string = DEFAULT_CATEGORY,
  country: string = DEFAULT_COUNTRY
) => {
  try {
    const { data } = await axios.get<ArticlesResponse>(
      `${newsEndpoints}?country=${country}&category=${category}`,
      {
        headers: {
          'X-API-KEY': API_KEY,
        },
      }
    )
    return data
  } catch (err) {
    console.log(err)
  }
}

export const fetchRSSFeed = async (url: string) => {
  try {
    // const { data } = await axios.get(url)
    const { data } = await axios.get(
      'https://api.rss2json.com/v1/api.json?rss_url=' + url
    )
    return data
  } catch (err) {
    console.log(err)
  }
}
