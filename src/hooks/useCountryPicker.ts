import { useEffect } from 'react'

import { useIonPicker } from '@ionic/react'

import { contryOptions } from '../config/constants'
import { useStorage } from '../context/StorageContext'
import { useCountry } from './useCountry'

export const useCountryPicker = () => {
  const { get } = useStorage()
  const { setCountry } = useCountry()
  const [showCountryPicker] = useIonPicker()

  useEffect(() => {
    const countryPicker = async () => {
      const savedCountry = await get('country')
      if (savedCountry) return

      showCountryPicker({
        buttons: [
          {
            text: 'Select Country',
            handler: (selected) => {
              setCountry(selected.country.value)
            },
          },
        ],
        columns: [
          {
            name: 'country',
            options: contryOptions.map((c) => ({ text: c, value: c })),
          },
        ],
      })
    }

    countryPicker()
  }, [])

  return {}
}
