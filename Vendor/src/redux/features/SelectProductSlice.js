import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the selectProduct (initially null)
const initialState = null; // Similar to `useState(null)`

// Create the slice
const selectProductSlice = createSlice({
  name: 'selectProduct',
  initialState,
  reducers: {
    // Action to set the selected product
    setSelectProduct: (state, action) => {
      return action.payload; // Update state with the selected product
    },
  },
});

// Export the action to set the selected product
export const { setSelectProduct } = selectProductSlice.actions;

// Export the reducer for the store
export default selectProductSlice.reducer;
