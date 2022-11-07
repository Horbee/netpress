import { RangeChangeEventDetail } from '@ionic/core'


import { categoryOptions } from '../config/constants'
import { useSettings } from '../context/SettingsProvider'

const minTabCount = 1
const maxTabCount = categoryOptions.length

export const useTabCount = () => {
  const {
    settings: { tabCount },
    saveTabCount,
  } = useSettings()

  const setTabCountInternal = (e: CustomEvent<RangeChangeEventDetail>) => {
    const newCount = e.detail.value as number
    saveTabCount(newCount)
  }

  return {
    rangeProps: {
      min: minTabCount,
      max: maxTabCount,
      value: tabCount,
      onIonChange: setTabCountInternal,
    },
    tabCount,
  }
}
