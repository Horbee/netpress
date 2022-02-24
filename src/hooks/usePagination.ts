import { useMemo, useState } from "react";

import { PaginatorProps } from "../components/Paginator";

interface UsePaginationReturnType extends PaginatorProps {
  currentPage: number
  setTotalResults: (total: number) => void
}

export const usePagination = (
  pageSize: number = 20
): UsePaginationReturnType => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const hasNexPage = useMemo(() => {
    if (!totalResults) return false

    return currentPage * pageSize < totalResults
  }, [pageSize, currentPage, totalResults])

  const hasPreviousPage = useMemo(() => {
    if (!totalResults) return false

    return currentPage * pageSize - pageSize > 0
  }, [pageSize, currentPage, totalResults])

  const hintText = useMemo(() => {
    if (!totalResults) return ''

    const from = (currentPage - 1) * pageSize + 1
    const to = Math.min(currentPage * pageSize, totalResults)

    const range = from === to ? from.toString() : `${from} - ${to}`

    return `${range} / ${totalResults}`
  }, [pageSize, totalResults, currentPage])

  return {
    hasNexPage,
    hasPreviousPage,
    hintText,
    setCurrentPage,
    currentPage,
    setTotalResults,
  }
}
