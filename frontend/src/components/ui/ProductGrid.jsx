import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import ProductCard from './ProductCard'

/**
 * Pure presentation component for displaying products in a grid layout
 */
function ProductGrid({ products, isLoading }) {
  if (products.length === 0 && !isLoading) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          No products found
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductGrid
