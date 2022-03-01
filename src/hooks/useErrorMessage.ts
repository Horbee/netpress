import { useCallback, useEffect } from "react";

import { useIonToast } from "@ionic/react";

export const useErrorMessage = (isError?: boolean, error?: any) => {
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
      showError('A hireket nem tudtuk betölteni.')
    }
  }, [isError, error, showError])

  return { showError }
}
