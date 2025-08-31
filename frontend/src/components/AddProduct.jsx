import React from 'react'
import { useProductForm } from '../hooks/useProductForm'
import ProductForm from './ui/ProductForm'

/**
 * Container component that manages business logic for product creation
 */
function AddProduct() {
  // Business logic hook
  const { formData, errors, mutation, actions } = useProductForm()

  return (
    <ProductForm
      formData={formData}
      errors={errors}
      onSubmit={actions.handleSubmit}
      onChange={actions.handleChange}
      isSubmitting={mutation.isPending}
      submitError={mutation.error?.message}
      isSuccess={mutation.isSuccess}
    />
  )
}

export default AddProduct
