import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { createContext, useContext, useEffect, useState } from 'react'


import { Drivers, Storage } from '@ionic/storage'

import type { ReactNode } from 'react'

type StorageContextType = {
  save: (key: string, value: any) => Promise<any>
  get: (key: string) => Promise<any>
  storage?: Storage
}

export const StorageContext = createContext<StorageContextType>(
  undefined as any
)

export const StorageContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [storage, setStorage] = useState<Storage>()

  useEffect(() => {
    const initDb = async () => {
      const store = new Storage({
        name: '__mydb',
        driverOrder: [
          CordovaSQLiteDriver._driver,
          Drivers.IndexedDB,
          Drivers.LocalStorage,
        ],
      })
      const db = await store.create()
      setStorage(db)
    }

    initDb()
  }, [])

  const save = async (key: string, value: any) => storage?.set(key, value)
  const get = async (key: string) => storage?.get(key)

  return (
    <StorageContext.Provider value={{ save, get, storage }}>
      {children}
    </StorageContext.Provider>
  )
}

export const useStorage = () => {
  const ctx = useContext(StorageContext)
  if (ctx === undefined) {
    throw new Error('useStorage must be used within a StorageContextProvider')
  }

  return ctx
}
