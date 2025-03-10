import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isLoggedOutModalOpen: false,  
};

const LogoutModalSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
 
    openLogOutModal: (state) => {
      state.isLoggedOutModalOpen = true;  
    },
    
    closeLogOutModal: (state) => {
      state.isLoggedOutModalOpen = false; 
    },
  },
});


export const { openLogOutModal, closeLogOutModal } = LogoutModalSlice.actions;

export default LogoutModalSlice.reducer;
