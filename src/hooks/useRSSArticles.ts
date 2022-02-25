import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";

import { mapRSStoArticle } from "../services/map-rss-to-article";
import { infiniteFetchRSSFeed } from "../services/news-service";

export const useRSSArticles = (selectedFeedURL: string) => {
  const {
    data: feedResponse,
    fetchNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery(['rss', selectedFeedURL], infiniteFetchRSSFeed, {
    getNextPageParam: (lastPage) => {
      if (lastPage.endIndex < lastPage.totalItems) {
        return {
          startIndex: lastPage.endIndex,
          endIndex: lastPage.endIndex + 20,
        }
      }
    },
    enabled: !!selectedFeedURL,
  })

  const articles = useMemo(() => {
    const items = feedResponse?.pages.flatMap((page) => page.items) ?? []
    return items.map(mapRSStoArticle)
  }, [feedResponse?.pages])

  return {
    refetch,
    isLoading,
    articles,
    loadMore: fetchNextPage,
  }
}
