import React from "react";
import { FaStoreAlt, FaExternalLinkAlt } from "react-icons/fa"; // Import icons from react-icons/fa
import "./Noproduct-OrdersAnimation.css";  // Import the CSS file for animations
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NoOrdersComponent = () => {
    const themeMode = useSelector((state) => state.theme.mode);
    const navigate = useNavigate()
    const handleViewInventory = () => {
        navigate("/hyperTrade/inventory")
    }
  return (
   
        <div className={`rounded-lg w-full h-fullshadow-xl p-6 sm:p-8 flex flex-col items-center justify-center  space-y-6 
          ${themeMode === "theme-mode-dark" ? "bg-gradient-to-b from-gray-900 to-black" : "bg-transparent"}`}>
          
          {/* Icon with animation */}
          <div className="animate-bounce-slow icon-pulse">
            <FaStoreAlt
              className={`text-6xl sm:text-7xl opacity-80 ${themeMode === "theme-mode-dark" ? 'text-gray-200' : 'text-gray-800'}`}
            />
          </div>

          {/* Content */}
          <div className="text-center space-y-4 fade-in">
            <h2 className={`text-xl sm:text-2xl font-bold ${themeMode === "theme-mode-dark" ? 'text-white' : 'text-gray-900'}`}>
              No Orders Available
            </h2>
            <p className={`text-sm sm:text-md max-w-md ${themeMode === "theme-mode-dark" ? 'text-gray-400' : 'text-gray-600'}`}>
              You haven't received any orders yet. Orders will appear here when customers make purchases.
            </p>
              {/* <button className={` p-2 justify-self-center text-sm flex rounded-md font-semibold ${
              themeMode === "theme-mode-dark"
                ? "bg-[#26DC5C] text-black hover:bg-[#26DC5C]"
                : "bg-[#26DC5C] text-white hover:bg-[#26DC5C]"
            } gap-3 items-center`} onClick={handleViewInventory}><span>View Inventory</span> <FaExternalLinkAlt /> </button> */}
          </div>
        </div>

  );
};

export default NoOrdersComponent
;
