import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductPrice } from '../hooks/useProducts'
import { usePriceCalculation } from '../hooks/usePriceCalculation'
import PriceDisplay from './ui/PriceDisplay'
import LoadingSpinner from './ui/LoadingSpinner'
import ErrorMessage from './ui/ErrorMessage'

/**
 * Container component that manages business logic for product price display
 */
function ProductPrice() {
  const { id } = useParams()
  
  // Business logic hooks
  const { 
    data: priceData, 
    isLoading, 
    error, 
    refetch,
    isFetching,
    isStale 
  } = useProductPrice(id)
  
  const calculations = usePriceCalculation(priceData)

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Error state
  if (error) {
    return <ErrorMessage error={error} showBackButton={true} />
  }

  return (
    <PriceDisplay
      priceData={priceData}
      calculations={calculations}
      onRefresh={refetch}
      isRefreshing={isFetching}
      isStale={isStale}
      isFetching={isFetching && !isLoading}
    />
  )
}

export default ProductPrice
