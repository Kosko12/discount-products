import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Box
} from '@mui/material'
import { Refresh } from '@mui/icons-material'

/**
 * Pure presentation component for product filtering controls
 */
function ProductFilters({
  categoryFilter,
  sortOrder,
  categories,
  onCategoryChange,
  onSortChange,
  onRefresh,
  isRefreshing,
  isStale,
  isFetching
}) {
  return (
    <Box className="mb-6 flex gap-4 flex-wrap items-center">
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryFilter}
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Sort by Price</InputLabel>
        <Select
          value={sortOrder}
          label="Sort by Price"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </Button>

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
    </Box>
  )
}

export default ProductFilters
