import { ArticleData } from '../models/article-data'
import { FeedItem } from '../models/rss-feed-data'

export const mapRSStoArticle = (RSSItem: FeedItem): ArticleData => {
  return {
    title: RSSItem.title,
    description: RSSItem.content,
    url: RSSItem.link,
    urlToImage: RSSItem.enclosure?.url ?? '',
    publishedAt: RSSItem.isoDate,
  }
}
