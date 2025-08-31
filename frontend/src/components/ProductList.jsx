import React from 'react'
import { Typography } from '@mui/material'
import { useProducts, useAllCategories } from '../hooks/useProducts'
import { useProductFilters } from '../hooks/useProductFilters'
import ProductFilters from './ui/ProductFilters'
import ProductGrid from './ui/ProductGrid'
import LoadingSpinner from './ui/LoadingSpinner'
import ErrorMessage from './ui/ErrorMessage'

/**
 * Container component that manages business logic for product listing
 */
function ProductList() {
  // Business logic hooks
  const { filters, filterActions, categories } = useProductFilters()
  
  // Fetch all categories to populate filter dropdown
  useAllCategories()
  
  const { 
    data: products = [], 
    isLoading, 
    error, 
    refetch,
    isFetching,
    isStale 
  } = useProducts(filters.category, filters.sort)

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Error state
  if (error) {
    return <ErrorMessage error={error} />
  }

  // Main render
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>

      <ProductFilters
        categoryFilter={filters.category}
        sortOrder={filters.sort}
        categories={categories}
        onCategoryChange={filterActions.setCategoryFilter}
        onSortChange={filterActions.setSortOrder}
        onRefresh={refetch}
        isRefreshing={isFetching}
        isStale={isStale}
        isFetching={isFetching && !isLoading}
      />

      <ProductGrid products={products} isLoading={isLoading} />
    </div>
  )
}

export default ProductList
