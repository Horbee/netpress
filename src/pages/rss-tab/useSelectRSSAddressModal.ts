import { useCallback, useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { v4 as uuidv4 } from 'uuid'

import { RSSFeedContext } from '../../context/RSSFeedContext'
import { useErrorMessage } from '../../hooks/useErrorMessage'
import { RSSAddressDocument } from '../../models/rss-addresses-response'
import { fetchRSSAddresses } from '../../services/news-service'

export const useSelectRSSAddressModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<RSSAddressDocument[]>([])
  const { addMultipleRSSAddresses, rssAddressList: localRssAddressList } =
    useContext(RSSFeedContext)

  const {
    isLoading,
    isError,
    error,
    data: rssAddressList,
  } = useQuery('rss-address-list', fetchRSSAddresses, { enabled: modalOpen })

  useErrorMessage(isError, error, 'A hírcsatorna listát nem tudtuk betölteni.')

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
