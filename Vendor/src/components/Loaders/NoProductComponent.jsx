import React from "react";
import { FaBoxOpen } from "react-icons/fa"; 
import { LuPackagePlus } from "react-icons/lu";
import "./Noproduct-OrdersAnimation.css";  
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NoProductComponent = () => {
    const themeMode = useSelector((state) => state.theme.mode);
    const navigate = useNavigate()
    const handleAddProduct = () => {
        navigate("/hyperTrade/inventory/addproduct");
      };
  return (
   
        <div className={`rounded-lg w-full h-fullshadow-xl p-6 sm:p-8 flex flex-col items-center justify-center  space-y-6 
          ${themeMode === "theme-mode-dark" ? "bg-gradient-to-b from-gray-900 to-black" : "bg-transparent"}`}>
          
          {/* Icon with animation */}
          <div className="animate-bounce-slow icon-pulse">
            <FaBoxOpen
              className={`text-6xl sm:text-7xl opacity-80 ${themeMode === "theme-mode-dark" ? 'text-gray-200' : 'text-gray-800'}`}
            />
          </div>

          {/* Content */}
          <div className="text-center space-y-4 fade-in">
            <h2 className={`text-xl sm:text-2xl font-bold ${themeMode === "theme-mode-dark" ? 'text-white' : 'text-gray-900'}`}>
              No Products
            </h2>
            <p className={`text-sm sm:text-md max-w-md ${themeMode === "theme-mode-dark" ? 'text-gray-400' : 'text-gray-600'}`}>
            "You currently have no products listed. Add some products to start selling"
            </p>
              <button
                        className={`flex items-center gap-2 rounded-lg font-semibold justify-self-center shadow-md px-4 py-2 transition-all mb-4 sm:mb-0 ${
                          themeMode === "theme-mode-dark"
                            ? "bg-[#26DC5C] text-black hover:bg-[#26DC5C]"
                            : "bg-[#26DC5C] text-white hover:bg-[#26DC5C]"
                        }`}
                        onClick={handleAddProduct}
                      >
                        <LuPackagePlus className="w-5 h-5" />
                        <span>Add Product</span>
                      </button>
          </div>
        </div>

  );
};

export default NoProductComponent
;
