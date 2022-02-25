export interface RSSFeedAddress {
  id: string
  name: string
  url: string
}

export interface FeedResponse {
  items: FeedItem[]
  feedUrl: string
  paginationLinks: {
    self: string
  }
  title: string
  description: string
  link: string
  copyright: string
  totalItems: number
  startIndex: number
  endIndex: number
}

export interface FeedItem {
  title: string
  link: string
  pubDate: string
  enclosure?: {
    url: string
    type: string
  }
  content: string
  contentSnippet: string
  guid: string
  isoDate: string
}
