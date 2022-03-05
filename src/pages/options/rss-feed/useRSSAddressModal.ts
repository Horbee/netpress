import { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { InputChangeEventDetail } from '@ionic/react'

import { RSSFeedContext } from '../../../context/RSSFeedContext'
import { RSSFeedAddress } from '../../../models/rss-feed-data'

export const useRSSAddressModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [id, setId] = useState('')

  const { addNewRSSAddress, editRSSAddress } = useContext(RSSFeedContext)

  const onClose = () => setModalOpen(false)
  const saveRSSAddress = () => {
    if (id) {
      editRSSAddress({ id, name, url })
    } else {
      addNewRSSAddress({ id: uuidv4(), name, url })
    }
    onClose()
  }

  const openRSSModal = (RSSAddress?: RSSFeedAddress) => {
    if (RSSAddress) {
      setId(RSSAddress.id)
      setName(RSSAddress.name)
      setUrl(RSSAddress.url)
    } else {
      setId('')
      setName('')
      setUrl('')
    }
    setModalOpen(true)
  }

  return {
    modalProps: {
      isOpen: modalOpen,
      onClose,
      saveRSSAddress,
      nameInputProps: {
        value: name,
        onIonChange: (e: CustomEvent<InputChangeEventDetail>) =>
          setName(e.detail.value as any),
      },
      urlInputProps: {
        value: url,
        onIonChange: (e: CustomEvent<InputChangeEventDetail>) =>
          setUrl(e.detail.value as any),
      },
    },
    openRSSModal,
  }
}
