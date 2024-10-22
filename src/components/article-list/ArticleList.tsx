import './ArticleList.scss'

import { forwardRef, useMemo } from 'react'
import { Virtuoso, VirtuosoProps } from 'react-virtuoso'

import { ArticleItem } from '../article-item/ArticleItem'

import type { ArticleData } from '../../models/article-data'

interface ArticleListProps {
  articles: ArticleData[]
  loadMore: () => void
  setScrolledToTop: (value: boolean) => void
  virtuosoProps?: VirtuosoProps<any, any>
  tabbarHeight?: number
}

export const ArticleList = forwardRef<any, ArticleListProps>(({ articles, loadMore, setScrolledToTop, virtuosoProps, tabbarHeight = 0 }, ref) => {
  const virtuosoHeight = useMemo(() => {
    return `calc(100% - ${tabbarHeight}px)`
  }, [tabbarHeight])

  return (
    <Virtuoso
      ref={ref}
      className="ion-content-scroll-host"
      atTopStateChange={setScrolledToTop}
      style={{ height: virtuosoHeight, overflowY: 'auto' }}
      data={articles}
      endReached={loadMore}
      overscan={600}
      itemContent={(index, article) => {
        return <ArticleItem key={article.url} article={article} />
      }}
      {...virtuosoProps}
    />
  )
})
