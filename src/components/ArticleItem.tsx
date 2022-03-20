import { hu, de } from 'date-fns/locale'

import { format } from 'date-fns'

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react'

import { ArticleData } from '../models/article-data'
import { useTranslation } from 'react-i18next'

interface ArticleItemProps {
  article: ArticleData
}

const locales: { [key: string]: Locale } = { de, hu }

export const ArticleItem = ({ article }: ArticleItemProps) => {
  const { i18n } = useTranslation()
  const domain = new URL(article.url).hostname.replace('www.', '')

  return (
    <div style={{ padding: '10px' }}>
      <IonCard style={{ margin: 0 }}>
        {article.urlToImage && <img src={article.urlToImage} alt="Article" />}
        <IonCardHeader>
          <IonCardSubtitle>{domain}</IonCardSubtitle>
          <IonCardTitle
            onClick={() => window.open(article.url, '_system', 'location=yes')}
          >
            {article.title}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{article.description}</IonCardContent>

        <IonCardContent style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {format(new Date(article.publishedAt), 'Pp', {
            locale: locales[i18n.language],
          })}
        </IonCardContent>
      </IonCard>
    </div>
  )
}
