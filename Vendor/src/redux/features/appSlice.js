// appSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {}; // Define an empty state object

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reset: (state) => {
            return initialState; // Reset state to its initial empty state
        },
    },
});

export const { reset } = appSlice.actions;
export default appSlice.reducer;
