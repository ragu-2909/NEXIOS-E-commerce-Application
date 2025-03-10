import React from 'react'
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { closeLogOutModal } from '../../redux/features/LogoutModalSlice';
import { reset } from '../../redux/features/appSlice';
// import { fetchOrders } from '../../redux/features/OrdersDataSlice';
// import { fetchProducts } from '../../redux/features/ProductsDataSlice';

const LogOut = () => {

    const themeMode = useSelector((state) => state.theme.mode);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
      
      // Clear tokens and vendor information from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("vendorName");
      localStorage.removeItem("vendorImg");
      localStorage.clear()
      
      // Dispatch global reset action
      dispatch(reset()); // Reset all slices
  
      // Close logout modal
      dispatch(closeLogOutModal());
  
      // Redirect to login page after a delay
      setTimeout(() => navigate("/login"), 500);
  };

    const onClose = () => {
        // navigate("/hyperTrade/home");
       dispatch(closeLogOutModal())
    
      };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div
            className={`w-[350px] h-[250px] ${
              themeMode === "theme-mode-dark"
                ? "bg-black text-txt-white"
                : "gradient-bg-light text-black"
            } rounded-lg p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between items-center space-y-6`}
          >
            <div className="text-center">
              <p className="text-2xl font-extrabold text-[#1db954]">Logging Out</p>
              <p className={`text-lg mt-10 ${themeMode === "theme-mode-dark" ? "text-txt-white" : "text-black"}`}>
                Are you sure you want to Log Out?
                
              </p>
            </div>
    
            <div className="w-full flex justify-around mt-4 space-x-4">
              <button
                type="button"
                className={`bg-[#df2b2b] hover:bg-[#e04242] ${themeMode === "theme-mode-dark" ? "text-black" : "text-txt-white"} transition-all p-3 rounded-md font-semibold w-28 shadow-md focus:outline-none focus:ring-2 focus:ring-[#ff3b3b]`}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className={`bg-[#1db954] hover:bg-[#21e065] ${themeMode === "theme-mode-dark" ? "text-black" : "text-txt-white"} transition-all p-3 rounded-md font-semibold w-28 shadow-md focus:outline-none focus:ring-2 focus:ring-[#1db954]`}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      );
}

export default LogOut