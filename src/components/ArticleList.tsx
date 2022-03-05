import './ArticleList.css'

import { forwardRef, useMemo } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { IonSpinner, isPlatform } from '@ionic/react'

import { ArticleData } from '../models/article-data'
import { ArticleItem } from './ArticleItem'

interface ArticleListProps {
  isLoading: boolean
  articles: ArticleData[]
  loadMore: () => void
  setScrolledToTop: (value: boolean) => void
  chipWrapper?: HTMLDivElement | null
}

export const ArticleList = forwardRef<any, ArticleListProps>(
  ({ isLoading, articles, loadMore, setScrolledToTop, chipWrapper }, ref) => {
    const virtuosoHeight = useMemo(() => {
      const chipHeight = chipWrapper?.clientHeight ?? 0

      let headerHeight = 0
      if (isPlatform('ios')) headerHeight = 56

      return `calc(100% - ${headerHeight}px - ${chipHeight}px)`
    }, [chipWrapper?.clientHeight])

    return (
      <>
        {isLoading ? (
          <div className="spinner-wrapper">
            <IonSpinner name="lines" color="primary" />
          </div>
        ) : (
          <Virtuoso
            ref={ref}
            atTopStateChange={setScrolledToTop}
            style={{ height: virtuosoHeight }}
            data={articles}
            endReached={loadMore}
            overscan={600}
            itemContent={(index, article) => {
              return <ArticleItem key={article.url} article={article} />
            }}
          />
        )}
      </>
    )
  }
)
