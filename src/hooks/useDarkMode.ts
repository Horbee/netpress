import { useSettings } from '../context/SettingsContext'

export const useDarkMode = () => {
  const {
    settings: { darkTheme },
    saveDarkTheme,
  } = useSettings()

  const toggle = () => saveDarkTheme(!darkTheme)

  return { toggle, darkTheme }
}
