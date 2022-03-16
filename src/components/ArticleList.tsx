import './ArticleList.css'

import { forwardRef, useMemo } from 'react'
import { Virtuoso, VirtuosoProps } from 'react-virtuoso'

import { IonSpinner, isPlatform } from '@ionic/react'

import { ArticleData } from '../models/article-data'
import { ArticleItem } from './ArticleItem'

interface ArticleListProps {
  isLoading: boolean
  articles: ArticleData[]
  loadMore: () => void
  setScrolledToTop: (value: boolean) => void
  virtuosoProps?: VirtuosoProps<any, any>
}

export const ArticleList = forwardRef<any, ArticleListProps>(
  ({ isLoading, articles, loadMore, setScrolledToTop, virtuosoProps }, ref) => {
    const virtuosoHeight = useMemo(() => {
      const headerHeight = isPlatform('ios') ? 56 : 0
      return `calc(100% - ${headerHeight}px)`
    }, [])

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
            {...virtuosoProps}
          />
        )}
      </>
    )
  }
)
