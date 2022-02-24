import { useContext, useEffect, useState } from "react";

import { RSSFeedContext } from "../context/RSSFeedContext";
import { RSSFeedAddress } from "../models/rss-feed-data";

export const useRSSChips = () => {
  const { rssAddressList } = useContext(RSSFeedContext)

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
