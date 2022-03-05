import { useState } from 'react'

import { CategoryOption, categoryOptions } from '../config/constants'

const defaultCategoryOrder: CategoryOption[] = localStorage.getItem(
  'categoryOrder'
)
  ? JSON.parse(localStorage.getItem('categoryOrder')!)
  : categoryOptions

export const useTabCategory = () => {
  const [categories, setCategories] = useState(defaultCategoryOrder)

  const doReorder = (event: CustomEvent) => {
    const newOrder = event.detail.complete(categories)
    localStorage.setItem('categoryOrder', JSON.stringify(newOrder))
    setCategories(newOrder)
  }

  return {
    doReorder,
    categories,
    setCategories,
  }
}
