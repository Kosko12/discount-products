import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Box,
  Chip,
  Divider
} from '@mui/material'
import { ArrowBack, LocalOffer, Refresh } from '@mui/icons-material'

/**
 * Pure presentation component for displaying price details
 */
function PriceDisplay({
  priceData,
  calculations,
  onRefresh,
  isRefreshing,
  isStale,
  isFetching
}) {
  if (!priceData || !calculations) return null

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Product Price Details
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          {isStale && (
            <Chip 
              label="Data may be outdated" 
              color="warning" 
              size="small" 
              variant="outlined"
            />
          )}
          {isFetching && (
            <Chip 
              label="Updating..." 
              color="info" 
              size="small"
            />
          )}
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={onRefresh}
            disabled={isRefreshing}
            size="small"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>
      </Box>

      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent>
          <Box textAlign="center" mb={3}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Product ID: {priceData.productId}
            </Typography>
          </Box>

          <Box mb={3}>
            <Typography variant="body1" gutterBottom>
              <strong>Original Price:</strong>
            </Typography>
            <Typography variant="h4" color="text.primary" gutterBottom>
              {priceData.originalPrice} {priceData.currency}
            </Typography>
          </Box>

          {calculations.hasDiscount && (
            <>
              <Divider className="my-4" />
              
              <Box mb={3}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <LocalOffer color="secondary" />
                  <Typography variant="h6" color="secondary">
                    Discount Applied
                  </Typography>
                </Box>
                
                <Box display="flex" gap={2} mb={2}>
                  <Chip 
                    label={`${priceData.discountType}: ${priceData.discountValue}%`}
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  You save: {calculations.savings} {priceData.currency}
                </Typography>
              </Box>

              <Divider className="my-4" />
            </>
          )}

          <Box mb={3}>
            <Typography variant="body1" gutterBottom>
              <strong>Final Price:</strong>
            </Typography>
            <Typography 
              variant="h3" 
              color={calculations.hasDiscount ? "secondary" : "primary"}
              gutterBottom
            >
              {priceData.finalPrice} {priceData.currency}
            </Typography>
          </Box>

          {!calculations.hasDiscount && (
            <Alert severity="info" className="mb-4">
              No discount rules are currently applied to this product.
            </Alert>
          )}

          <Box mt={4}>
            <Button 
              component={Link} 
              to="/" 
              variant="outlined" 
              startIcon={<ArrowBack />}
              fullWidth
            >
              Back to Products
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default PriceDisplay
