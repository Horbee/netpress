import { useSettings } from '../context/SettingsProvider'

export const useTabCategory = () => {
  const {
    settings: { categories },
    saveCategories,
  } = useSettings()

  const doReorder = (event: CustomEvent) => {
    const newOrder = event.detail.complete(categories)
    saveCategories(newOrder)
  }

  return {
    doReorder,
    categories,
  }
}
