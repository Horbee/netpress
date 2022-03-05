import { ArticleData } from './article-data'

export interface ArticlesResponse {
  status: string
  totalResults: number
  articles: ArticleData[]
  startIndex: number
  endIndex: number
}
