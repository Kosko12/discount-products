import { createSlice } from '@reduxjs/toolkit'

/**
 * Redux slice for managing product categories
 */
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    isInitialized: false
  },
  reducers: {
    initializeCategories: (state, action) => {
      state.list = [...new Set(action.payload)]
      state.isInitialized = true
    },
    addCategory: (state, action) => {
      const category = action.payload
      if (category && !state.list.includes(category)) {
        state.list.push(category)
      }
    },
    removeCategory: (state, action) => {
      const category = action.payload
      state.list = state.list.filter(cat => cat !== category)
    },
    updateCategories: (state, action) => {
      // Update categories based on current products
      const newCategories = [...new Set(action.payload)]
      state.list = newCategories
    }
  }
})

export const { 
  initializeCategories, 
  addCategory, 
  removeCategory, 
  updateCategories 
} = categoriesSlice.actions

export default categoriesSlice.reducer
