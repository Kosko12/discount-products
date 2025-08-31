import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip
} from '@mui/material'
import { Visibility } from '@mui/icons-material'

/**
 * Pure presentation component for displaying a single product
 */
function ProductCard({ product }) {
  return (
    <Card className="h-full">
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {product.name}
        </Typography>
        
        <Chip 
          label={product.category} 
          size="small" 
          className="mb-2"
          color="primary"
          variant="outlined"
        />
        
        <Typography variant="h5" color="primary" className="mb-2">
          {product.priceGross} {product.currency}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" className="mb-3">
          Created: {new Date(product.createdAt).toLocaleDateString()}
        </Typography>
        
        <Button
          component={Link}
          to={`/price/${product.id}`}
          variant="outlined"
          startIcon={<Visibility />}
          fullWidth
        >
          View Final Price
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard
