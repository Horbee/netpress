import moment from 'moment'
import { ArticleData } from '../models/article-data'
import './ArticleItem.css'

interface ArticleItemProps {
  article: ArticleData
}

export const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <main className="article">
      {article.urlToImage && (
        <img src={article.urlToImage} alt="Article Image" />
      )}
      <p
        className="title"
        onClick={() => window.open(article.url, '_system', 'location=yes')}
      >
        {article.title}
      </p>
      <p className="date">{moment(article.publishedAt).format('LLL')}</p>
      <p className="description">{article.description}</p>
      <div className="divider" />
    </main>
  )
}
