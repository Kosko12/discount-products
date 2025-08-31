import { useMemo } from 'react'

/**
 * Custom hook for price calculation logic
 */
export function usePriceCalculation(priceData) {
  const calculations = useMemo(() => {
    if (!priceData) return null

    const savings = priceData.discountApplied 
      ? (parseFloat(priceData.originalPrice) - parseFloat(priceData.finalPrice)).toFixed(2)
      : 0

    const discountPercentage = priceData.discountApplied
      ? ((parseFloat(priceData.originalPrice) - parseFloat(priceData.finalPrice)) / parseFloat(priceData.originalPrice) * 100).toFixed(1)
      : 0

    return {
      savings,
      discountPercentage,
      hasDiscount: priceData.discountApplied,
      originalPrice: parseFloat(priceData.originalPrice),
      finalPrice: parseFloat(priceData.finalPrice)
    }
  }, [priceData])

  return calculations
}
