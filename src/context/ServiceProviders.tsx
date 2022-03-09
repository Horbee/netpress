import { FC, useEffect } from 'react'

import { MenuTabContextProvider } from './MenuTabContext'
import { RSSFeedContextProvider } from './RSSFeedContext'

export const ServiceProviders: FC = ({ children }) => {
  return (
    <RSSFeedContextProvider>
      <MenuTabContextProvider>{children}</MenuTabContextProvider>
    </RSSFeedContextProvider>
  )
}
