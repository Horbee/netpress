import { useMemo } from 'react'

import { infiniteFetchArticles } from '../services/news-service'
import { useErrorMessage } from './useErrorMessage'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useArticles = (categoryId: string, country: string) => {
  const {
    data: articleResponse,
    fetchNextPage,
    refetch,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['news', categoryId, country],
    queryFn: infiniteFetchArticles,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.endIndex < lastPage.totalResults) {
        return {
          startIndex: lastPage.endIndex,
          endIndex: lastPage.endIndex + 20,
        }
      }
    },
  })

  useErrorMessage(isError, error)

  const articles = useMemo(() => {
    return articleResponse?.pages.flatMap((page) => page.articles) ?? []
  }, [articleResponse?.pages])

  return { refetch, isLoading, articles, loadMore: fetchNextPage }
}
