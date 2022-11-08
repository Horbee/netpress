import { createContext, useContext } from 'react'


import { RSSFeedAddress } from '../models/rss-feed-data'
import { useSettings } from './SettingsProvider'

import type { ReactNode } from 'react'

const RSSFeedContext = createContext<
  | {
      rssAddressList: RSSFeedAddress[]
      addNewRSSAddress: (rssAddress: RSSFeedAddress) => void
      editRSSAddress: (rssAddress: RSSFeedAddress) => void
      deleteRSSAddress: (rssAddressId: string) => void
      saveRSSAddressList: (rssAddressList: RSSFeedAddress[]) => void
      addMultipleRSSAddresses: (rssAddresses: RSSFeedAddress[]) => void
    }
  | undefined
>(undefined)

export const RSSFeedProvider = ({ children }: { children: ReactNode }) => {
  const {
    settings: { rssAddressList },
    saveRSSAddressList,
  } = useSettings()

  const addNewRSSAddress = (rssAddress: RSSFeedAddress) => {
    saveRSSAddressList([...rssAddressList, rssAddress])
  }

  const addMultipleRSSAddresses = (rssAddresses: RSSFeedAddress[]) => {
    saveRSSAddressList([...rssAddressList, ...rssAddresses])
  }

  const editRSSAddress = (rssAddress: RSSFeedAddress) => {
    const newList = rssAddressList.map((item) => {
      if (item.id === rssAddress.id) return rssAddress
      return item
    })
    saveRSSAddressList(newList)
  }

  const deleteRSSAddress = (rssAddressId: string) => {
    const newList = rssAddressList.filter(
      (address) => address.id !== rssAddressId
    )
    saveRSSAddressList(newList)
  }

  return (
    <RSSFeedContext.Provider
      value={{
        rssAddressList,
        addNewRSSAddress,
        addMultipleRSSAddresses,
        editRSSAddress,
        deleteRSSAddress,
        saveRSSAddressList,
      }}
    >
      {children}
    </RSSFeedContext.Provider>
  )
}

export const useRSSFeed = () => {
  const ctx = useContext(RSSFeedContext)
  if (ctx === undefined) {
    throw new Error('useRSSFeed must be used within a RSSFeedProvider')
  }

  return ctx
}