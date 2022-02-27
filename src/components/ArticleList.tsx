import "./ArticleList.css";

import { forwardRef, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";

import { IonSpinner } from "@ionic/react";

import { ArticleData } from "../models/article-data";
import { ArticleItem } from "./ArticleItem";

interface ArticleListProps {
  isLoading: boolean
  articles: ArticleData[]
  loadMore: () => void
  chipWrapper?: HTMLDivElement | null
}

export const ArticleList = forwardRef<any, ArticleListProps>(
  ({ isLoading, articles, loadMore, chipWrapper }, ref) => {
    const virtuosoHeight = useMemo(() => {
      const chipHeight = chipWrapper?.clientHeight ?? 0
      // Toolbar and Tabbar both have 56px height
      return `calc(100vh - 56px - 56px - ${chipHeight}px)`
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
