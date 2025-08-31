import { useState } from 'react'
import { useCategories } from './useCategories'

/**
 * Custom hook for managing product filtering and sorting logic
 */
export function useProductFilters() {
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  
  // Get categories from Redux store
  const { categories } = useCategories()

  const filters = {
    category: categoryFilter,
    sort: sortOrder
  }

  const filterActions = {
    setCategoryFilter,
    setSortOrder,
    resetFilters: () => {
      setCategoryFilter('')
      setSortOrder('asc')
    }
  }

  return {
    filters,
    filterActions,
    categories
  }
}
