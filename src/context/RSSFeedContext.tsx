import { createContext, FC, useState } from "react";

import { RSSFeedAddress } from "../models/rss-feed-data";

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

  const saveRSSAddressList = (rssAddressList: RSSFeedAddress[]) => {
    setRSSAddressList(rssAddressList)
    localStorage.setItem(RSS_ADDRESS_LIST, JSON.stringify(rssAddressList))
  }

  const addNewRSSAddress = (rssAddress: RSSFeedAddress) => {
    const newList = [...rssAddressList, rssAddress]
    saveRSSAddressList(newList)
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
        editRSSAddress,
        deleteRSSAddress,
        saveRSSAddressList,
      }}
    >
      {children}
    </RSSFeedContext.Provider>
  )
}
