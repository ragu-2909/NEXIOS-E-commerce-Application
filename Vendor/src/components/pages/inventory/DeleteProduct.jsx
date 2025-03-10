import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/features/ProductsDataSlice";
import { setSelectProduct } from "../../../redux/features/SelectProductSlice";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const products = useSelector((state) => state.productsData.products);
  const status = useSelector((state) => state.productsData.status);
  const error = useSelector((state) => state.productsData.error);
  const selectedProduct = useSelector((state) => state.selectProduct);
  const onClose = () => {
    navigate("/hyperTrade/inventory");
    // navigate("/hyperTrade/discounts")

  };
  

  const handleDeleteProduct = () => {
    console.log(`name : ${selectedProduct.name}  id : ${selectedProduct._id}`);
    if (products.length <= 1) {
      dispatch(setSelectProduct(null));
    } else{
      dispatch(setSelectProduct(products[0]))
    }
    dispatch(deleteProduct(selectedProduct._id));
    
    
    
      onClose();
  
  };

   


  return ReactDOM.createPortal(
    <div className="fixed top-0 w-full h-full mt-[65px] bg-stone-950 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-10">
      <div
        className={`w-[350px] h-[250px] ${
          themeMode === "theme-mode-dark"
            ? "bg-black text-txt-white"
            : "gradient-bg-light text-black"
        } rounded-lg p-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between items-center space-y-6`}
      >
        <div className="text-center">
          <p className="text-2xl font-extrabold text-[#1db954]">Delete Product</p>
          <p className={`text-lg mt-2 ${themeMode === "theme-mode-dark" ? "text-txt-white" : "text-black"}`}>
            Are you sure you want to delete{" "}
            <span className="font-bold text-[#1ed760]">{selectedProduct.name}</span>?
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
            onClick={handleDeleteProduct}
            className={`bg-[#1db954] hover:bg-[#21e065] ${themeMode === "theme-mode-dark" ? "text-black" : "text-txt-white"} transition-all p-3 rounded-md font-semibold w-28 shadow-md focus:outline-none focus:ring-2 focus:ring-[#1db954]`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default DeleteProduct;
