import './CountryPicker.scss'

import { IonModal, IonToolbar, IonButtons, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/react'
import { useCountry } from '../../hooks/useCountry'
import { useEffect, useState } from 'react'
import { countryOptions } from '../../config/constants'
import { useStorage } from '../../context/StorageContext'

export const CountryPicker = () => {
  const { get } = useStorage()
  const { setCountry } = useCountry()

  const [selectedCountry, selectCountry] = useState<any>(countryOptions[0])
  const [showCountryPicker, setShow] = useState(false)

  useEffect(() => {
    const countryPicker = async () => {
      const savedCountry = await get('country')
      console.log('savedCountry', savedCountry)
      setShow(!savedCountry)
    }
    countryPicker()
  }, [])

  return (
    <IonModal className="country-picker" isOpen={showCountryPicker}>
      <IonToolbar>
        <IonButtons>
          <IonButton
            disabled={!selectedCountry}
            onClick={() => {
              setCountry(selectedCountry!)
              setShow(false)
            }}
          >
            Select
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonPicker className="country-picker">
        <IonPickerColumn value={selectedCountry} onIonChange={({ detail }) => selectCountry(detail.value)}>
          {countryOptions.map((c) => (
            <IonPickerColumnOption key={c} value={c}>
              {c}
            </IonPickerColumnOption>
          ))}
        </IonPickerColumn>
      </IonPicker>
    </IonModal>
  )
}
