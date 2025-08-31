import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

/**
 * Pure presentation component for error states
 */
function ErrorMessage({ error, showBackButton = false }) {
  return (
    <div>
      <Alert severity="error" className="mb-4">
        Error: {error.message}
      </Alert>
      {showBackButton && (
        <Button component={Link} to="/" startIcon={<ArrowBack />}>
          Back to Products
        </Button>
      )}
    </div>
  )
}

export default ErrorMessage
