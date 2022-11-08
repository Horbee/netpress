import { useEffect, useState } from 'react'


import { useRSSFeed } from '../context/RSSFeedProvider'
import { RSSFeedAddress } from '../models/rss-feed-data'

export const useRSSChips = () => {
  const { rssAddressList } = useRSSFeed()

  const [selectedFeed, setSelectedFeed] = useState<RSSFeedAddress | undefined>()

  useEffect(() => {
    setSelectedFeed(rssAddressList[0])
  }, [rssAddressList])

  const isSelected = (feed: RSSFeedAddress) => feed.id === selectedFeed?.id

  return {
    selectedFeed,
    setSelectedFeed,
    isSelected,
  }
}
