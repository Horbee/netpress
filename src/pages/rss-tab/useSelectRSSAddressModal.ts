import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'


import { useRSSFeed } from '../../context/RSSFeedProvider'
import { useCountry } from '../../hooks/useCountry'
import { useErrorMessage } from '../../hooks/useErrorMessage'
import { fetchRSSAddresses } from '../../services/news-service'

import type { RSSAddressDocument } from '../../models/rss-addresses-response'
export const useSelectRSSAddressModal = () => {
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const { country } = useCountry()
  const [selected, setSelected] = useState<RSSAddressDocument[]>([])
  const { addMultipleRSSAddresses, rssAddressList: localRssAddressList } =
    useRSSFeed()

  const {
    isLoading,
    isError,
    error,
    data: rssAddressList,
  } = useQuery(
    ['rss-address-list', country],
    () => fetchRSSAddresses(country),
    {
      enabled: modalOpen,
    }
  )

  useErrorMessage(isError, error, t('error.rss'))

  const onClose = () => setModalOpen(false)
  const openRSSModal = () => {
    setSelected([])
    setModalOpen(true)
  }

  const selectRSSAddress = () => {
    addMultipleRSSAddresses(
      selected.map((address) => ({
        id: uuidv4(),
        name: address.fields.name.stringValue,
        url: address.fields.url.stringValue,
      }))
    )
    onClose()
  }

  const toggleSelection = (item: RSSAddressDocument) => {
    if (selected.some((i) => i.name === item.name)) {
      setSelected((prev) => prev.filter((a) => a.name !== item.name))
    } else {
      setSelected((prev) => [...prev, item])
    }
  }

  const isInList = useCallback(
    (item: RSSAddressDocument) => {
      return localRssAddressList.some(
        (i) => i.url === item.fields.url.stringValue
      )
    },
    [localRssAddressList]
  )

  const isSelected = useCallback(
    (item: RSSAddressDocument) => {
      return selected.some((i) => i.name === item.name)
    },
    [selected]
  )

  return {
    modalProps: {
      isLoading,
      isOpen: modalOpen,
      onClose,
      selectRSSAddress,
      rssAddressList,
      isInList,
      isSelected,
      setSelected,
      toggleSelection,
    },
    openRSSModal,
  }
}
