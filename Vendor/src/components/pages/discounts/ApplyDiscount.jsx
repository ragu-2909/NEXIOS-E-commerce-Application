import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { applyDiscount } from "../../../redux/features/ProductsDataSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const discountSchema = z.object({
  discount: z
    .number()
    .min(0, "Discount must be positive")
    .max(100, "Discount must be less than or equal to 100"),
});
const ApplyDiscount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const products = useSelector((state) => state.productsData.products);
  const status = useSelector((state) => state.productsData.status);
  const error = useSelector((state) => state.productsData.error);
  const discountedproducts = useSelector(
    (state) => state.selectDiscountedProduct
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(discountSchema) });
  
 const onClose = () => {
  navigate("/hyperTrade/discounts")
 }
  const onSubmit = (data) => {
    console.log("discount : ", data, typeof data);
    const result = discountedproducts.reduce((acc, curr) => {
      acc[curr] = data.discount;
      return acc;
    }, {});
    console.log("result : ", result);
    const discData = JSON.stringify(result);
    console.log(discData);
    dispatch(applyDiscount(discData));
    if (status === "succeeded") {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed top-0 w-full h-full mt-[65px] bg-stone-950 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-10">
    <div
    className={`max-w-lg mx-auto p-6 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
      themeMode === "theme-mode-dark" ? "bg-black text-txt-white" : "gradient-bg-light text-black"
    }`}
  >
    <h2
      className={`text-3xl font-extrabold mb-6 text-center ${
        themeMode === "theme-mode-dark" ? "text-[#66d96b]" : "text-[#1db954]"
      }`}
    >
      Apply Discount
    </h2>
  
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Apply discount */}
        <label htmlFor="disc" className="block mb-2 text-md font-medium">
          Discount (in%):
        </label>
        <input
          type="number"
          name="discount"
          id="disc"
          {...register("discount", { valueAsNumber: true })}
          required
          className={`w-full p-3 rounded-lg border ${
            themeMode === "theme-mode-dark"
              ? "bg-[#1a1a1a] text-gray-300 border-gray-600"
              : "bg-gray-200 text-gray-700 border-gray-400"
          } transition-all duration-300`}
        />
        {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
      </div>
  
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <button
          type="button"
          className={`bg-[#df2b2b] hover:bg-[#e04242] ${
            themeMode === "theme-mode-dark" ? "text-black" : "text-white"
          } py-3 px-6 rounded-lg font-semibold shadow-md transition-all duration-300`}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`bg-[#4caf50] hover:bg-[#66d96b] ${
            themeMode === "theme-mode-dark" ? "text-black" : "text-white"
          } px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300`}
        >
          Apply Discount
        </button>
      </div>
    </form>
  </div>
  
  </div>,
  document.getElementById("modals")
  );
};

export default ApplyDiscount;
