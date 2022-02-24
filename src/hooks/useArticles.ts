import { useEffect } from "react";
import { useQuery } from "react-query";

import { fetchArticles } from "../services/news-service";
import { usePagination } from "./usePagination";

export const useArticles = (categoryId: string, country: string) => {
  const { currentPage, setTotalResults, ...paginationProps } = usePagination()

  const {
    data: articleResponse,
    isLoading,
    refetch,
  } = useQuery(['news', categoryId, country, currentPage], () =>
    fetchArticles(categoryId, country, currentPage)
  )

  useEffect(() => {
    if (articleResponse) setTotalResults(articleResponse.totalResults)
    else setTotalResults(0)
  }, [articleResponse])

  useEffect(() => {
    paginationProps.setCurrentPage(1)
  }, [categoryId, country])

  return { refetch, isLoading, articleResponse, paginationProps }
}
