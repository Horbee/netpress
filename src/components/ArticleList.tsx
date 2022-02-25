import "./ArticleList.css";

import { forwardRef } from "react";
import { Virtuoso } from "react-virtuoso";

import { IonSpinner } from "@ionic/react";

import { ArticleData } from "../models/article-data";
import { ArticleItem } from "./ArticleItem";

interface ArticleListProps {
  isLoading: boolean
  articles: ArticleData[]
  loadMore: () => void
}

export const ArticleList = forwardRef<any, ArticleListProps>(
  ({ isLoading, articles, loadMore }, ref) => {
    return (
      <>
        {isLoading ? (
          <div className="spinner-wrapper">
            <IonSpinner name="lines" color="primary" />
          </div>
        ) : (
          <Virtuoso
            ref={ref}
            style={{ height: '80%' }}
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
