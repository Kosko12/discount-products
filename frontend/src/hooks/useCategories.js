import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { initializeCategories, addCategory, updateCategories } from '../store/categoriesSlice'

/**
 * Custom hook for managing categories with Redux
 */
export function useCategories() {
  const dispatch = useDispatch()
  const { list: categories, isInitialized } = useSelector(state => state.categories)

  const initializeCategoriesAction = useCallback((products) => {
    if (!isInitialized && products?.length > 0) {
      const categoryList = products.map(p => p.category).filter(Boolean)
      dispatch(initializeCategories(categoryList))
    }
  }, [dispatch, isInitialized])

  const addCategoryAction = useCallback((category) => {
    if (category && category.trim()) {
      dispatch(addCategory(category.trim()))
    }
  }, [dispatch])

  const updateFromProductsAction = useCallback((products) => {
    if (products?.length > 0) {
      const categoryList = products.map(p => p.category).filter(Boolean)
      dispatch(updateCategories(categoryList))
    } else {
      // Clear categories if no products
      dispatch(updateCategories([]))
    }
  }, [dispatch])

  const actions = {
    initializeCategories: initializeCategoriesAction,
    addCategory: addCategoryAction,
    updateFromProducts: updateFromProductsAction
  }

  return {
    categories,
    isInitialized,
    actions
  }
}
