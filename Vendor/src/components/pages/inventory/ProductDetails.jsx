import React,{useEffect} from "react";
import PDLoadingComponent from "../../Loaders/PDLoadingComponent"
import {  useSelector } from "react-redux";



const ProductDetails = () => {
//   const status = useSelector((state) => state.productsData.status);
const themeMode = useSelector((state) => state.theme.mode);
const products = useSelector((state) => state.productsData.products)
const selectedProduct = useSelector((state) => state.selectProduct);
  // console.log(selectedProduct);
  const getLimitedDescription = (description) => {
    if (!description) return ''; // Return an empty string if description is undefined or null
    const words = description.split(' '); // Split the description into words
    if (words.length > 25) {
      return words.slice(0, 25).join(' ') + '...'; // Limit to 25 words and add "..."
    }
    return description; // Return as is if it's less than or equal to 25 words
  };
  
  if (!selectedProduct  || !products.length) {
    // Fallback to loading screen if no product is selected
    return (
      <div
  className={`flex flex-col items-center justify-center w-full h-full p-6 rounded-lg shadow-lg max-w-6xl mx-auto ${
    themeMode === "theme-mode-dark"
      ? "gradient-bg-dark text-gray-200"
      : "gradient-bg-light text-gray-800"
  }`}
>
        <PDLoadingComponent />
      </div>
    );
  }
 
  return (
<div
  className={`flex flex-col items-center justify-center w-full h-full p-6 rounded-lg shadow-lg  mx-auto ${
    themeMode === "theme-mode-dark"
      ? "gradient-bg-dark text-gray-200"
      : "gradient-bg-light text-gray-800"
  }`}
>
  
  
    <div
      className={`w-full rounded-lg  p-6 sm:p-8 ${
        themeMode === "theme-mode-dark"
          ? "bg-black"
          : "bg-transparent"
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-6 ${
          themeMode === "theme-mode-dark"
            ? "border-gray-800"
            : "border-gray-300"
        }`}
      >
        <h1
          className={`text-4xl font-extrabold tracking-wide text-center md:text-left ${
            themeMode === "theme-mode-dark"
              ? "text-[#26DC5C]"
              : "text-[#26DC5C]"
          }`}
        >
          {selectedProduct?.name}
        </h1>
        <p
          className={`text-sm mt-2 md:mt-0 text-center md:text-right ${
            themeMode === "theme-mode-dark"
              ? "text-gray-500"
              : "text-gray-600"
          }`}
        >
          Product ID:{" "}
          <span
            className={`${
              themeMode === "theme-mode-dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {selectedProduct?._id}
          </span>
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div
          className={`relative rounded-lg p-4 md:w-1/3 lg:w-1/2 ${
            themeMode === "theme-mode-dark"
              ? "bg-gray-800"
              : "bg-gray-100"
          }`}
        >
          <img
            src={selectedProduct?.image[0]}
            alt={selectedProduct?.name}
            className="object-contain rounded-lg shadow-lg w-full h-full max-h-[300px] md:max-h-[400px]"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-2/3 lg:w-1/2 flex flex-col">
          {/* Pricing */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-lg mb-8">
            <div>
              <p
                className={`font-bold text-2xl ${
                  themeMode === "theme-mode-dark"
                    ? "text-[#26DC5C]"
                    : "text-[#26DC5C]"
                }`}
              >
                ₹{selectedProduct?.price}
              </p>
              <p
                className={`text-sm line-through ${
                  themeMode === "theme-mode-dark"
                    ? "text-red-500"
                    : "text-red-400"
                }`}
              >
                Cost Price: ₹{selectedProduct?.costPrice}
              </p>
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0">
              <p
                className={`${
                  themeMode === "theme-mode-dark"
                    ? "text-gray-500"
                    : "text-gray-600"
                }`}
              >
                {selectedProduct?.category}
              </p>
              <p
                className={`${
                  themeMode === "theme-mode-dark"
                    ? "text-gray-500"
                    : "text-gray-600"
                }`}
              >
                {selectedProduct?.subCategory}
              </p>
            </div>
          </div>

          {/* Description */}
          <div
            className={`rounded-lg p-4 mb-6 shadow-md ${
              themeMode === "theme-mode-dark"
                ? "bg-gray-800"
                : "bg-gray-100"
            }`}
          >
            <h3
              className={`text-lg font-bold mb-2 ${
                themeMode === "theme-mode-dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Description
            </h3>
            <p
              className={`leading-relaxed text-[0.835rem] ${
                themeMode === "theme-mode-dark"
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              {getLimitedDescription(selectedProduct?.description)} {/* Apply the word limit here */}
            </p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <span
                className={`font-semibold ${
                  themeMode === "theme-mode-dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Weight:
              </span>{" "}
              {selectedProduct?.weight} kg
            </div>
            <div>
              <span
                className={`font-semibold ${
                  themeMode === "theme-mode-dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Delivery:
              </span>{" "}
              {selectedProduct?.delivery === "company"
                ? "By Company"
                : "Self Pickup"}
            </div>
          </div>

          {/* Variant Section */}
          <div className="mt-8">
            <label
              className={`block mb-2 ${
                themeMode === "theme-mode-dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Select Variant:
            </label>
            <select
              className={`w-full p-3 rounded-lg shadow-md focus:outline-none focus:ring ${
                themeMode === "theme-mode-dark"
                  ? "bg-gray-800 text-gray-300 focus:ring-[#26DC5C]"
                  : "bg-gray-100 text-gray-700 focus:ring-[#26DC5C]"
              }`}
            >
              {selectedProduct?.quantity.map((variant, index) => (
                <option key={index} value={variant.type}>
                  {variant.type} - {variant.quantity} in stock
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  
</div>

  
  );
  
};

export default ProductDetails;
