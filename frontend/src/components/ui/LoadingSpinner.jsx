import React from 'react'
import { Box, CircularProgress } from '@mui/material'

/**
 * Pure presentation component for loading states
 */
function LoadingSpinner({ size = 40, minHeight = "200px" }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight={minHeight}>
      <CircularProgress size={size} />
    </Box>
  )
}

export default LoadingSpinner
