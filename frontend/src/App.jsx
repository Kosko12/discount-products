import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import ProductPrice from './components/ProductPrice'
import Navigation from './components/Navigation'
import { queryClient } from './lib/queryClient'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Product Catalog
                </Typography>
              </Toolbar>
            </AppBar>
            
            <Navigation />
            
            <Container maxWidth="lg" className="py-8">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/price/:id" element={<ProductPrice />} />
              </Routes>
            </Container>
          </div>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
