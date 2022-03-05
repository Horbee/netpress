import { useState } from 'react'

import { RangeChangeEventDetail } from '@ionic/core'

import { categoryOptions } from '../config/constants'

const defaultTabCount = Number(localStorage.getItem('tabCount') ?? 4)
const minTabCount = 1
const maxTabCount = categoryOptions.length

export const useTabCount = () => {
  const [tabCount, setTabCount] = useState(defaultTabCount)

  const setTabCountInternal = (e: CustomEvent<RangeChangeEventDetail>) => {
    const newCount = e.detail.value as number
    localStorage.setItem('tabCount', newCount.toString())
    setTabCount(newCount)
  }

  return {
    rangeProps: {
      min: minTabCount,
      max: maxTabCount,
      value: tabCount,
      onIonChange: setTabCountInternal,
    },
    tabCount,
    setTabCount,
  }
}
