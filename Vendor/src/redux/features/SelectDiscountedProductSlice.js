import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the selectDiscountedProduct (initially null)
const initialState = null; // Similar to `useState(null)`

// Create the slice
const selectDiscountedProductSlice = createSlice({
  name: 'selectDiscountedProduct',
  initialState,
  reducers: {
    // Action to set the selected product
    setSelectDiscountedProduct: (state, action) => {
      return action.payload; // Update state with the selected product
    },
  },
});

// Export the action to set the selected product
export const { setSelectDiscountedProduct } = selectDiscountedProductSlice.actions;

// Export the reducer for the store
export default selectDiscountedProductSlice.reducer;
