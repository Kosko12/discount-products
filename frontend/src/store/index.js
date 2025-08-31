import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categoriesSlice'

/**
 * Redux store configuration
 */
export const store = configureStore({
  reducer: {
    categories: categoriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

// Export store types for TypeScript usage if needed
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
