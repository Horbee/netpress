import { useCallback, useEffect } from "react";

import { useIonToast } from "@ionic/react";

export const useErrorMessage = (
  isError?: boolean,
  error?: any,
  customErrorMessage: string = 'A hireket nem tudtuk betölteni.'
) => {
  const [showToast] = useIonToast()

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
      showError(customErrorMessage)
    }
  }, [isError, error, showError])

  return { showError }
}
