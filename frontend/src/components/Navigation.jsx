import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tabs, Tab, Box } from '@mui/material'

function Navigation() {
  const location = useLocation()
  
  const getTabValue = () => {
    if (location.pathname === '/') return 0
    if (location.pathname === '/add') return 1
    return false
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
      <Tabs value={getTabValue()} aria-label="navigation tabs">
        <Tab label="Products" component={Link} to="/" />
        <Tab label="Add Product" component={Link} to="/add" />
      </Tabs>
    </Box>
  )
}

export default Navigation
