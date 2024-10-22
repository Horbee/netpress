import { useMemo } from 'react'

import { mapRSStoArticle } from '../services/map-rss-to-article'
import { infiniteFetchRSSFeed } from '../services/news-service'
import { useErrorMessage } from './useErrorMessage'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useRSSArticles = (selectedFeedURL: string) => {
  const {
    data: feedResponse,
    fetchNextPage,
    refetch,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['rss', selectedFeedURL],
    queryFn: infiniteFetchRSSFeed,
    initialPageParam: undefined,
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

  useErrorMessage(isError, error)

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
