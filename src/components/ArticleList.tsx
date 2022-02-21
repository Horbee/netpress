import "./ArticleList.css";

import { IonList, IonSpinner } from "@ionic/react";

import { ArticleData } from "../models/article-data";
import { ArticleItem } from "./ArticleItem";

interface ArticleListProps {
  isLoading: boolean
  articles: ArticleData[]
}

export const ArticleList = ({ isLoading, articles }: ArticleListProps) => {
  return (
    <>
      {isLoading ? (
        <div className="spinner-wrapper">
          <IonSpinner name="lines" color="primary" />
        </div>
      ) : (
        <IonList>
          {articles.map((article) => (
            <ArticleItem key={article.url} article={article} />
          ))}
        </IonList>
      )}
    </>
  )
}
