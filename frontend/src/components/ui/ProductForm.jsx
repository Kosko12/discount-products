import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  CircularProgress
} from '@mui/material'
import { Save } from '@mui/icons-material'

/**
 * Pure presentation component for product creation form
 */
function ProductForm({
  formData,
  errors,
  onSubmit,
  onChange,
  isSubmitting,
  submitError,
  isSuccess
}) {
  if (isSuccess) {
    return (
      <Box textAlign="center" py={4}>
        <Alert severity="success" className="mb-4">
          Product created successfully! Redirecting to product list...
        </Alert>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Product
      </Typography>

      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent>
          {submitError && (
            <Alert severity="error" className="mb-4">
              {submitError}
            </Alert>
          )}

          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={onChange}
              error={!!errors.category}
              helperText={errors.category}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Price (Gross)"
              name="priceGross"
              type="number"
              step="0.01"
              value={formData.priceGross}
              onChange={onChange}
              error={!!errors.priceGross}
              helperText={errors.priceGross}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={onChange}
              error={!!errors.currency}
              helperText={errors.currency}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="External ID (Optional)"
              name="externalId"
              value={formData.externalId}
              onChange={onChange}
              error={!!errors.externalId}
              helperText={errors.externalId}
              margin="normal"
            />

            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <Save />}
                disabled={isSubmitting}
                fullWidth
                size="large"
              >
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductForm
