import { FC } from 'react'

import { RSSFeedContextProvider } from './RSSFeedContext'

export const ServiceProviders: FC = ({ children }) => {
  return <RSSFeedContextProvider>{children}</RSSFeedContextProvider>
}
