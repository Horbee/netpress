import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useIonToast } from '@ionic/react'

import { sendErrorLog } from '../services/news-service'

export const useErrorMessage = (isError?: boolean, error?: any, customErrorMessage?: string) => {
  const { t } = useTranslation()
  const [showToast] = useIonToast()

  const errorMessage = customErrorMessage ?? t('error.news')!

  const showError = useCallback(
    (message: string) => {
      showToast({
        message,
        duration: 3000,
        color: 'danger',
      })
    },
    [showToast]
  )

  useEffect(() => {
    if (isError) {
      console.error(error)
      showError(errorMessage)
      sendErrorLog(errorMessage, JSON.stringify(error))
    }
  }, [isError, error, showError, errorMessage])

  return { showError }
}
