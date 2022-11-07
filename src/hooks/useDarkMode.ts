import { useSettings } from '../context/SettingsProvider'

export const useDarkMode = () => {
  const {
    settings: { darkTheme },
    saveDarkTheme,
  } = useSettings()

  const toggle = () => saveDarkTheme(!darkTheme)

  return { toggle, darkTheme }
}
