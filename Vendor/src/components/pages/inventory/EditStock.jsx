import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProductStock } from "../../../redux/features/ProductsDataSlice";

const EditStockForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const products = useSelector((state) => state.productsData.products);
  const status = useSelector((state) => state.productsData.status);
  const error = useSelector((state) => state.productsData.error);
  const selectedProduct = useSelector((state) => state.selectProduct);
  const onClose = () => {
    navigate("/hyperTrade/inventory");
  };

  // console.log(`products at efs ${products}`);
  const [quantity, setQuantity] = useState(products.total || 0);
  const [variants, setVariants] = useState([]);
  const [variantType, setVariantType] = useState(products.variantType || "");

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.hasVariant) {
        setVariants(selectedProduct.quantity || []);
        setVariantType(selectedProduct.variantType || "");
      } else {
        setQuantity(selectedProduct.total || 0);
      }
    }
  }, [selectedProduct]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = variants.map((variant, i) => {
      if (i === index) {
        return {
          ...variant,
          [field]: value, // Update the specific field for the changed variant
        };
      }
      return variant;
    });
    setVariants(updatedVariants); // Update the state with the new array
  };

  const addVariant = () => {
    setVariants([...variants, { type: "", quantity: 0 }]);
  };

  const removeVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = selectedProduct.hasVariant
      ? { variantType, quantity: variants }
      : {
          variantType: "Null",
          quantity: [{ type: "original", quantity: quantity }],
        };

    console.log(updatedData);
    dispatch(
      editProductStock({
        productID: selectedProduct._id,
        editedProductStock: updatedData,
      })
    );

    if (status === "succeeded") {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed top-0 w-full h-full mt-[65px] bg-stone-950 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-10">
      <div
        className={`max-w-lg mx-auto p-6  rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
          themeMode === "theme-mode-dark"
            ? "bg-black text-txt-white"
            : "gradient-bg-light text-black"
        }`}
      >
        <h2
          className={`text-3xl font-extrabold mb-6 text-center ${
            themeMode === "theme-mode-dark"
              ? "text-[#66d96b]"
              : "text-[#1db954]"
          }`}
        >
          Edit Stock
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedProduct?.hasVariant ? (
            <>
              {/* Variant Type */}
              <div>
                <label className="block mb-2 text-md font-medium">
                  Variant Type
                </label>
                <input
                  type="text"
                  placeholder={selectedProduct.variantType}
                  onChange={(e) => setVariantType(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    themeMode === "theme-mode-dark"
                      ? "bg-[#1a1a1a] text-gray-300 border-gray-600"
                      : "bg-gray-200 text-gray-700 border-gray-400"
                  }  transition-all duration-300`}
                />
              </div>

              {/* Variants */}
              <div>
                <label className="block mb-4 text-md font-medium">
                  Variants
                </label>
                {variants.map((variant, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <input
                      type="text"
                      placeholder="Variant (e.g. Red)"
                      value={variant.type}
                      onChange={(e) =>
                        handleVariantChange(index, "type", e.target.value)
                      }
                      className={`w-1/2 p-3 rounded-lg border ${
                        themeMode === "theme-mode-dark"
                          ? "bg-[#1a1a1a] text-gray-300 border-gray-600 "
                          : "bg-gray-200 text-gray-700 border-gray-400 "
                      }   transition-all duration-300`}
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={variant.quantity}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className={`w-1/2 p-3 rounded-lg border ${
                        themeMode === "theme-mode-dark"
                          ? "bg-[#1a1a1a] text-gray-300 border-gray-600 "
                          : "bg-gray-200 text-gray-700 border-gray-400 "
                      }  transition-all duration-300`}
                    />
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className={`bg-[#df2b2b] hover:bg-[#e04242]  ${
                        themeMode === "theme-mode-dark"
                          ? "text-black"
                          : "text-white"
                      } px-4 py-2 rounded-lg  font-semibold transition-all duration-300`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addVariant}
                  className={`bg-[#4caf50] hover:bg-[#66d96b]  ${
                    themeMode === "theme-mode-dark"
                      ? "text-black"
                      : "text-white"
                  } px-4 py-3 rounded-lg font-semibold transition-all duration-300`}
                >
                  Add Variant
                </button>
              </div>
            </>
          ) : (
            <div>
              {/* Total Quantity */}
              <label className="block mb-2 text-md font-medium">
                Total Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder={selectedProduct.total}
                className={`w-full p-3 rounded-lg border ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1a1a1a] text-gray-300 border-gray-600 "
                    : "bg-gray-200 text-gray-700 border-gray-400 "
                }  transition-all duration-300`}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className={`bg-[#df2b2b] hover:bg-[#e04242] ${
                themeMode === "theme-mode-dark" ? "text-black" : "text-white"
              } py-3 px-6 rounded-lg  font-semibold shadow-md transition-all duration-300`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-[#4caf50] hover:bg-[#66d96b] ${
                themeMode === "theme-mode-dark" ? "text-black" : "text-white"
              } px-6 py-3 rounded-lg font-semibold  shadow-md transition-all duration-300`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>,

    document.getElementById("modals")
  );
};

export default EditStockForm;
