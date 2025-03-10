import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the theme
const initialState = {
  mode: 'theme-mode-dark',  // Default mode
  color: 'theme-color-red',  // Default color
};


const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
   
    setMode(state, action) {
      state.mode = action.payload;
    },
   
    setColor(state, action) {
      state.color = action.payload;
    },
  },
});


export const { setMode, setColor } = themeSlice.actions;

export default themeSlice.reducer;
