import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../../redux/features/ProductsDataSlice";
import categoryData from "./categoryData.json";

const getCategoryData = (categoryName) => {
  const category = categoryData.find(
    (category) => category.name === categoryName
  );
  if (category) {
    return {
      name: category.name,
      platformFee: category.platformFee,
      subcategories: category.subcategories,
    };
  }
  return null; // If category doesn't exist
};

const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.productsData.status);
  const selectedProduct = useSelector((state) => state.selectProduct);
  const themeMode = useSelector((state) => state.theme.mode);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    costPrice: "",
    weight: "",
    delivery: "",
    description: "",
    category: "",
    subCategory: "",
  });

  const [fieldsToUpdate, setFieldsToUpdate] = useState({
    name: false,
    price: false,
    costPrice: false,
    weight: false,
    delivery: false,
    description: false,
    category: false,
  });

  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const onClose = () => {
    navigate("/hyperTrade/inventory");
  };

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        price: selectedProduct.price || "",
        costPrice: selectedProduct.costPrice || "",
        weight: selectedProduct.weight || "",
        delivery: selectedProduct.delivery || "",
        description: selectedProduct.description || "",
        category: selectedProduct.category || "",
        subCategory: selectedProduct.subCategory || "",
      });
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (formData.category) {
      const categoryData = getCategoryData(formData.category);
      if (categoryData) {
        setSubCategoryOptions(categoryData.subcategories);
      } else {
        setSubCategoryOptions([]);
      }
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFieldsToUpdate((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {};

    // Loop through all fields to check if they should be updated
    for (const field in fieldsToUpdate) {
      if (fieldsToUpdate[field]) {
        updatedData[field] = formData[field];
      }
    }

    // Always include the subCategory if it's present in formData (even if checkbox is unchecked)
    if (formData.subCategory) {
      updatedData.subCategory = formData.subCategory;
    }
    console.log(selectedProduct._id);
    console.log("updated data", updatedData); // This will show the updated data with the subCategory included

    // Dispatch the update action
    dispatch(
      updateProduct({
        productID: selectedProduct._id,
        updatedProduct: updatedData,
      })
    );

    if (status === "succeeded") {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed top-0 w-full h-full mt-[65px] bg-stone-950 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-10">
      <div
        className={`rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
          themeMode === "theme-mode-dark"
            ? "bg-black text-txt-white"
            : "gradient-bg-light text-black"
        } p-10 max-w-3xl mx-auto`}
      >
        <h2 className="text-4xl font-extrabold text-center text-[#4caf50] mb-10 tracking-wide">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Update Name */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="name"
                checked={fieldsToUpdate.name}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update Name</label>
            </div>
            {fieldsToUpdate.name && (
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder={selectedProduct.name}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update weight */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="weight"
                checked={fieldsToUpdate.weight}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update Weight</label>
            </div>
            {fieldsToUpdate.weight && (
              <input
                type="number"
                name="weight"
                value={formData.weight}
                placeholder={selectedProduct.weight}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="description"
                checked={fieldsToUpdate.description}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update Description</label>
            </div>
            {fieldsToUpdate.description && (
              <textarea
                name="description"
                value={formData.description}
                placeholder={selectedProduct.description}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update Delivery Mode */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="delivery"
                checked={fieldsToUpdate.delivery}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50] transition-all duration-300"
              />
              <label className="text-lg font-medium ">
                Update Delivery Mode
              </label>
            </div>
            {fieldsToUpdate.delivery && (
              <div className="space-y-4">
                <label className="text-lg font-medium">Delivery Mode</label>
                <div className="flex items-center space-x-8">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="delivery"
                      value="company"
                      checked={formData.delivery === "company"}
                      onChange={handleChange}
                      className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50] transition-all duration-300"
                    />
                    <span className="text-sm">By Company</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="delivery"
                      value="self"
                      checked={formData.delivery === "self"}
                      onChange={handleChange}
                      className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50] transition-all duration-300"
                    />
                    <span className="text-sm">Self Pickup</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Update Cost Price */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="costPrice"
                checked={fieldsToUpdate.costPrice}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update Cost Price</label>
            </div>
            {fieldsToUpdate.costPrice && (
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                placeholder={selectedProduct.costPrice}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update Selling Price */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="price"
                checked={fieldsToUpdate.price}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">
                Update Selling Price
              </label>
            </div>
            {fieldsToUpdate.price && (
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder={selectedProduct.price}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update Category */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="category"
                checked={fieldsToUpdate.category}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update Category</label>
            </div>
            {fieldsToUpdate.category && (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              >
                <option value="">Select Category</option>
                {categoryData.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Update SubCategory */}
          {fieldsToUpdate.category && (
            <div className="space-y-4">
              <label className="text-lg font-medium ">Update SubCategory</label>

              <select
                name="subCategory"
                value={fieldsToUpdate.category ? formData.subCategory : ""}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              >
                <option value="">Select SubCategory</option>
                {subCategoryOptions.map((subCategory, index) => (
                  <option key={index} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={onClose}
              className={`bg-[#df2b2b] hover:bg-[#e04242] py-3 px-6 rounded-lg ${
                themeMode === "theme-mode-dark"
                  ? "text-black"
                  : "text-txt-white"
              } font-semibold focus:outline-none focus:ring-2 focus:ring-gray-700 shadow-md transition-all duration-300`}
            >
              Close
            </button>
            <button
              type="submit"
              className={`bg-[#4caf50] hover:bg-[#66d96b] py-3 px-6 rounded-lg ${
                themeMode === "theme-mode-dark"
                  ? "text-black"
                  : "text-txt-white"
              } font-semibold focus:outline-none  shadow-md transition-all duration-300`}
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default UpdateProduct;
