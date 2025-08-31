import { useEffect, useRef } from 'react'
import { useCategories } from './useCategories'

/**
 * Hook for synchronizing categories with product data
 * Handles initialization, updates, and cleanup of categories
 */
export function useCategorySync(products = []) {
  const { actions: categoryActions, isInitialized } = useCategories()
  const prevProductsRef = useRef()

  useEffect(() => {
    // Prevent unnecessary updates by comparing products
    const productsChanged = JSON.stringify(prevProductsRef.current) !== JSON.stringify(products)
    if (!productsChanged) return

    prevProductsRef.current = products

    if (!products || products.length === 0) {
      // If no products and already initialized, clear categories
      if (isInitialized) {
        categoryActions.updateFromProducts([])
      }
      return
    }

    // Initialize or update categories based on current products
    if (!isInitialized) {
      categoryActions.initializeCategories(products)
    } else {
      categoryActions.updateFromProducts(products)
    }
  }, [products, isInitialized, categoryActions.initializeCategories, categoryActions.updateFromProducts])

  return {
    syncCategories: categoryActions.updateFromProducts
  }
}
