import { useEffect } from 'react'

import { useSettings } from '../context/SettingsContext'

export const useDarkMode = () => {
  const {
    settings: { darkTheme },
    saveDarkTheme,
  } = useSettings()

  useEffect(() => {
    if (darkTheme) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [darkTheme])

  const toggle = () => saveDarkTheme(!darkTheme)

  return { toggle, darkTheme }
}
