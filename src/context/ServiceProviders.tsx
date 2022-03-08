import { FC } from 'react'

import { CountryContextProvider } from './CountryContext'
import { MenuTabContextProvider } from './MenuTabContext'
import { RSSFeedContextProvider } from './RSSFeedContext'

export const ServiceProviders: FC = ({ children }) => {
  return (
    <RSSFeedContextProvider>
      <CountryContextProvider>
        <MenuTabContextProvider>{children}</MenuTabContextProvider>
      </CountryContextProvider>
    </RSSFeedContextProvider>
  )
}
