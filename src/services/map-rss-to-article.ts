import { ArticleData } from "../models/article-data";

export const mapRSStoArticle = (RSSItem: any): ArticleData => {
  return {
    title: RSSItem.title,
    description: RSSItem.description,
    url: RSSItem.link,
    urlToImage: RSSItem.enclosure.link,
    publishedAt: RSSItem.pubDate,
  }
}
