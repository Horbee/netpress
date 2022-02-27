import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";

import { infiniteFetchArticles } from "../services/news-service";

export const useArticles = (categoryId: string, country: string) => {
  const {
    data: articleResponse,
    fetchNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery(['news', categoryId, country], infiniteFetchArticles, {
    getNextPageParam: (lastPage) => {
      if (lastPage.endIndex < lastPage.totalResults) {
        return {
          startIndex: lastPage.endIndex,
          endIndex: lastPage.endIndex + 20,
        }
      }
    },
  })

  const articles = useMemo(() => {
    return articleResponse?.pages.flatMap((page) => page.articles) ?? []
  }, [articleResponse?.pages])

  return { refetch, isLoading, articles, loadMore: fetchNextPage }
}
