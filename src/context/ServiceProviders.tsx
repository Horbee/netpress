import type { ReactNode } from 'react'

import { RSSFeedContextProvider } from './RSSFeedContext'

export const ServiceProviders = ({ children }: { children: ReactNode }) => {
  return <RSSFeedContextProvider>{children}</RSSFeedContextProvider>
}
