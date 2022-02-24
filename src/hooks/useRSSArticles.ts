import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";

import { mapRSStoArticle } from "../services/map-rss-to-article";
import { fetchRSSFeed } from "../services/news-service";
import { usePagination } from "./usePagination";

export const useRSSArticles = (selectedFeedURL: string) => {
  const { currentPage, setTotalResults, ...paginationProps } = usePagination()

  const {
    data: feedResponse,
    isLoading,
    refetch,
  } = useQuery(
    ['rss', selectedFeedURL, currentPage],
    () => fetchRSSFeed(selectedFeedURL, currentPage),
    {
      enabled: !!selectedFeedURL,
    }
  )

  useEffect(() => {
    if (feedResponse) setTotalResults(feedResponse.totalItems)
    else setTotalResults(0)
  }, [feedResponse])

  useEffect(() => {
    paginationProps.setCurrentPage(1)
  }, [selectedFeedURL])

  const articles = useMemo(
    () => feedResponse?.items.map(mapRSStoArticle) ?? [],
    [feedResponse?.items]
  )

  return { refetch, isLoading, articles, paginationProps }
}
