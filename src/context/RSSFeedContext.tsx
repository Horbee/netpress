import { createContext, FC, useState } from 'react'

import { useEffectIgnoreFirst } from '../hooks/useEffectIgnoreFirst'
import { RSSFeedAddress } from '../models/rss-feed-data'

type RSSFeedContextType = {
  rssAddressList: RSSFeedAddress[]
  addNewRSSAddress: (rssAddress: RSSFeedAddress) => void
  editRSSAddress: (rssAddress: RSSFeedAddress) => void
  deleteRSSAddress: (rssAddressId: string) => void
  saveRSSAddressList: (rssAddressList: RSSFeedAddress[]) => void
}

export const RSSFeedContext = createContext<RSSFeedContextType>(
  undefined as any
)

const RSS_ADDRESS_LIST = 'RSSAddressList'

const defaultRSSAddressList: RSSFeedAddress[] = localStorage.getItem(
  RSS_ADDRESS_LIST
)
  ? JSON.parse(localStorage.getItem(RSS_ADDRESS_LIST)!)
  : []

export const RSSFeedContextProvider: FC = ({ children }) => {
  const [rssAddressList, setRSSAddressList] = useState(defaultRSSAddressList)

  useEffectIgnoreFirst(() => {
    localStorage.setItem(RSS_ADDRESS_LIST, JSON.stringify(rssAddressList))
  }, [rssAddressList])

  const addNewRSSAddress = (rssAddress: RSSFeedAddress) => {
    setRSSAddressList((prev) => [...prev, rssAddress])
  }

  const editRSSAddress = (rssAddress: RSSFeedAddress) => {
    const newList = rssAddressList.map((item) => {
      if (item.id === rssAddress.id) return rssAddress
      return item
    })
    setRSSAddressList(newList)
  }

  const deleteRSSAddress = (rssAddressId: string) => {
    const newList = rssAddressList.filter(
      (address) => address.id !== rssAddressId
    )
    setRSSAddressList(newList)
  }

  return (
    <RSSFeedContext.Provider
      value={{
        rssAddressList,
        addNewRSSAddress,
        editRSSAddress,
        deleteRSSAddress,
        saveRSSAddressList: setRSSAddressList,
      }}
    >
      {children}
    </RSSFeedContext.Provider>
  )
}
