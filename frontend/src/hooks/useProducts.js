import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCategories } from './useCategories'
import { useEffect, useRef } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Fetch all categories (unfiltered)
export const useAllCategories = () => {
  const { actions: categoryActions, isInitialized } = useCategories()

  return useQuery({
    queryKey: ['allCategories'],
    queryFn: async () => {
      // Fetch all products without filters to get all categories
      const response = await fetch(`${API_URL}/products`)
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const allProducts = await response.json()
      
      // Update Redux store with all categories
      if (!isInitialized) {
        categoryActions.initializeCategories(allProducts)
      } else {
        categoryActions.updateFromProducts(allProducts)
      }
      
      return allProducts
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - categories change less frequently
    cacheTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Fetch products with filters
export const useProducts = (categoryFilter = '', sortOrder = 'asc') => {
  return useQuery({
    queryKey: ['products', { category: categoryFilter, sort: sortOrder }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (categoryFilter) params.append('category', categoryFilter)
      if (sortOrder) params.append('sort', sortOrder)

      const response = await fetch(`${API_URL}/products?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes,
  })
}

// Fetch single product price
export const useProductPrice = (productId) => {
  return useQuery({
    queryKey: ['productPrice', productId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/${productId}/price`)
      if (!response.ok) {
        throw new Error('Failed to fetch product price')
      }
      return response.json()
    },
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutes for price data
  })
}

// Create product mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const { actions: categoryActions } = useCategories()

  return useMutation({
    mutationFn: async (productData) => {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create product')
      }

      return response.json()
    },
    onSuccess: (newProduct) => {
      // Add new category if it doesn't exist
      if (newProduct.category) {
        categoryActions.addCategory(newProduct.category)
      }
      
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

// Delete product mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  const { actions: categoryActions } = useCategories()

  return useMutation({
    mutationFn: async (productId) => {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete product')
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] })
      
      // Note: Categories will be updated when products are refetched
      // via the useProducts hook's queryFn
    },
  })
}
