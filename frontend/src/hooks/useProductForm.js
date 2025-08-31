import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProduct } from './useProducts'

/**
 * Custom hook for managing product form state and submission logic
 */
export function useProductForm() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const createProductMutation = useCreateProduct()
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    priceGross: '',
    currency: 'PLN',
    externalId: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    createProductMutation.mutate(formData, {
      onSuccess: () => {
        setTimeout(() => {
          navigate('/')
        }, 1500)
      },
      onError: (error) => {
        if (error.message.includes('errors')) {
          try {
            const errorData = JSON.parse(error.message)
            if (errorData.errors) {
              setErrors(errorData.errors)
            }
          } catch {
            // Handle non-JSON error messages
          }
        }
      }
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      priceGross: '',
      currency: 'PLN',
      externalId: ''
    })
    setErrors({})
  }

  return {
    formData,
    errors,
    mutation: createProductMutation,
    actions: {
      handleChange,
      handleSubmit,
      resetForm
    }
  }
}
