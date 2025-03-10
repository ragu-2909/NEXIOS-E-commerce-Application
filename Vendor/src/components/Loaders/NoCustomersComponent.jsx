import React from "react";
import { FaUsersSlash } from "react-icons/fa"; 
import "./Noproduct-OrdersAnimation.css";  
import { useSelector } from "react-redux";

const NoCustomersComponent = () => {
    const themeMode = useSelector((state) => state.theme.mode);
   
    
  return (
   
        <div className={`rounded-lg w-full h-fullshadow-xl p-6 sm:p-8 flex flex-col items-center justify-center  space-y-6 
          ${themeMode === "theme-mode-dark" ? "bg-gradient-to-b from-gray-900 to-black" : "bg-transparent"}`}>
          
          {/* Icon with animation */}
          <div className="animate-bounce-slow icon-pulse">
            <FaUsersSlash
              className={`text-6xl sm:text-7xl opacity-80 ${themeMode === "theme-mode-dark" ? 'text-gray-200' : 'text-gray-800'}`}
            />
          </div>

          {/* Content */}
          <div className="text-center space-y-4 fade-in">
            <h2 className={`text-xl sm:text-2xl font-bold ${themeMode === "theme-mode-dark" ? 'text-white' : 'text-gray-900'}`}>
              No Customers
            </h2>
            <p className={`text-sm sm:text-md max-w-md ${themeMode === "theme-mode-dark" ? 'text-gray-400' : 'text-gray-600'}`}>
           "It seems like you have no customers yet. Start engaging and building relationships!"
            </p>
             
          </div>
        </div>

  );
};

export default NoCustomersComponent
;
