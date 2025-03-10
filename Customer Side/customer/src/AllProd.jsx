import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "./FetchProd";

export default function AllProd() {
  const [productArr, setProductArr] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [blink, setBlink] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVariants, setSelectedVariants] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [tokenexist, setTokenExist] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts('/products');
        if (response && response.data && response.data.data) {
          setProductArr(response.data.data);

          // Initialize currentImageIndex for each product
          const initialIndex = {};
          response.data.data.forEach(product => {
            initialIndex[product._id] = 0;
          });
          setCurrentImageIndex(initialIndex);
        } else {
          console.error("Failed to fetch products or invalid response structure.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
    checkToken();
  }, []);

  // Extract unique categories
  const categories = [...new Set(productArr.map(product => product.category))];

  // Check for existing token
  function checkToken() {
    const token = localStorage.getItem('token');
    setTokenExist(!!token);
  }

  // Handle adding item to cart
  function handleAddToCart(productId, variant, name, image) {
    setCartItems(prevItems => ({
      ...prevItems,
      [productId]: {
        quantity: 1,
        variant,
        name,
        image
      },
    }));
  }

  // Handle cart item increment
  function handleIncrement(productId) {
    setCartItems(prevItems => ({
      ...prevItems,
      [productId]: {
        ...prevItems[productId],
        quantity: (prevItems[productId]?.quantity || 0) + 1
      }
    }));
  }

  // Handle cart item decrement
  function handleDecrement(productId) {
    setCartItems(prevItems => {
      const currentQuantity = prevItems[productId]?.quantity || 0;
      if (currentQuantity <= 1) {
        const newItems = { ...prevItems };
        delete newItems[productId];
        return newItems;
      }
      return {
        ...prevItems,
        [productId]: {
          ...prevItems[productId],
          quantity: currentQuantity - 1
        }
      };
    });
  }

  // Image navigation functions
  function handleNextImage(productId, imageLength) {
    setCurrentImageIndex(prevState => ({
      ...prevState,
      [productId]: (prevState[productId] + 1) % imageLength,
    }));
  }

  function handlePrevImage(productId, imageLength) {
    setCurrentImageIndex(prevState => ({
      ...prevState,
      [productId]: (prevState[productId] - 1 + imageLength) % imageLength,
    }));
  }

  // Variant change handler
  function handleVariantChange(productId, variantType) {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variantType,
    });
  }

  // Category scroll functions
  const categoryRef = useRef(null);

  const scrollLeft = () => {
    categoryRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    categoryRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  // Product click handler
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All"
    ? productArr
    : productArr.filter(product => product.category === selectedCategory);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Category filter */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Categories</h2>
        <div className="flex items-center mt-2">
          <button onClick={scrollLeft} className="mr-2 bg-gray-800 text-white px-2 py-1 rounded-md">←</button>

          <div ref={categoryRef} className="flex overflow-hidden space-x-3" style={{ maxWidth: '100%' }}>
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-md ${selectedCategory === "All" ? 'bg-green-400' : 'bg-gray-800'} text-white`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-green-400' : 'bg-gray-800'} text-white`}
              >
                {category}
              </button>
            ))}
          </div>

          <button onClick={scrollRight} className="ml-2 bg-gray-800 text-white px-2 py-1 rounded-md">→</button>
        </div>
      </div>

      {/* Display filtered products */}
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6`}>
        {filteredProducts.map((product) => {
          const discountedPrice = product.price * (1 - (product.discount?.vendor.disc || 0) / 100);
          const availableVariants = product.quantity || [];

          return (
            <div
              key={product._id}
              className="bg-gray-900 p-4 border border-green-400 rounded-md relative group transition-all duration-300 ease-in-out hover:z-10"
              style={{ cursor: "pointer" }}
            >
              {/* Product image with navigation */}
              <div className="relative">
                <img
                  src={product.image[currentImageIndex[product._id] || 0]}
                  onClick={() => handleProductClick(product._id)}
                  alt={product.name}
                  className="h-32 w-full object-contain mb-4"
                />
                <button
                  onClick={() => handlePrevImage(product._id, product.image.length)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2"
                >
                  {"<"}
                </button>
                <button
                  onClick={() => handleNextImage(product._id, product.image.length)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2"
                >
                  {">"}
                </button>
              </div>

              {/* Product details */}
              <h2 className="text-lg">{product.name}</h2>
              <div className="text-sm" onClick={() => handleProductClick(product._id)}>
                <p className={`${product.discount.vendor.disc != 0 ? "line-through" : "text-transparent"} text-gray-400`}>
                  MRP: ₹{product.price}
                </p>
                <p className="text-green-400 font-bold text-2xl">
                  ₹{discountedPrice.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </p>
                <p className={`${product.discount.vendor.disc == 0 ? "text-transparent" : "text-gray-400"} text-xs`}>
                  You save {product?.discount?.vendor?.disc ? `${product.discount.vendor.disc}%` : "0%"}!
                </p>
              </div>

              {/* Variant selection */}
              {availableVariants.length > 0 && product.hasVariant && (
                <div className="relative group">
                  <div className="product-card relative">
                    <div className="variant-select mt-2 bg-gray-800 p-4 rounded-md">
                      <label
                        htmlFor={`variant-${product._id}`}
                        className={`text-gray-400 ${product.discount.vendor.disc === 0 ? "mt-0" : "mt-2"}`}
                      >
                        Choose Variant:
                      </label>
                      <select
                        id={`variant-${product._id}`}
                        value={selectedVariants[product._id] || availableVariants[0].type}
                        onChange={(e) => handleVariantChange(product._id, e.target.value)}
                        className="w-full mt-1 bg-gray-800 text-white border border-green-400 p-2 rounded-md"
                      >
                        {availableVariants.map((variant) => (
                          <option
                            key={variant.type}
                            value={variant.type}
                            disabled={variant.quantity === "0"}
                          >
                            {variant.type} ({variant.quantity === "0" ? "Out of stock" : "In stock"})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Stock status */}
              <p className="text-sm flex items-center mt-2">
                {product.quantity.reduce((sum, variant) => sum + parseInt(variant.quantity), 0) > 5 && (
                  <span
                    className={`h-3 w-3 rounded-full mr-2 ${blink ? "bg-green-500" : "bg-transparent"}`}
                    style={{ transition: "background-color 0.3s ease-in-out" }}
                  ></span>
                )}
                {product.quantity.reduce((sum, variant) => sum + parseInt(variant.quantity), 0) === 0 && (
                  <span
                    className={`h-3 w-3 rounded-full mr-2 ${blink ? "bg-red-500" : "bg-transparent"}`}
                    style={{ transition: "background-color 0.3s ease-in-out" }}
                  ></span>
                )}
                <span style={{ color: product.quantity.reduce((sum, variant) => sum + parseInt(variant.quantity), 0) <= 5 ? "red" : "white" }}>
                  {product.quantity.reduce((sum, variant) => sum + parseInt(variant.quantity), 0) <= 5 && product.quantity.reduce((sum, variant) => sum + parseInt(variant.quantity), 0) > 0
                    ? `Only ${product.quantity.reduce((sum, variant) => sum + parseInt(variant.quantity), 0)} left!`
                    : product.quantity.reduce((sum, variant) => sum + parseInt(variant.quantity), 0) === 0
                      ? "Out of Stock"
                      : "In stock"}
                </span>
              </p>

              {/* Add to Cart / Cart Control */}
              {
                !cartItems[product._id] ? (
                  // Ensure product.quantity is an array before calling reduce
                  Array.isArray(product.quantity) &&
                  product.quantity.reduce((sum, variant) => sum + parseInt(variant.quantity || 0), 0) > 0 && (
                    <button
                      onClick={() => {
                        if (tokenexist) {
                          handleAddToCart(
                            product._id,
                            selectedVariants[product._id] || availableVariants[0].type,
                            product.name,
                            product.image[0]
                          );
                        } else {
                          setIsLoginModalOpen(true);
                        }
                      }}
                      className="mt-4 relative bg-black text-white p-2 w-full rounded-lg 
        border-2 border-transparent transition-all duration-300
        hover:shadow-[0_0_15px_rgba(144,238,144,0.8)]"
                    >
                      <span className="relative z-10">Add to Cart</span>
                      <div className="absolute inset-0 p-[2px] rounded-lg bg-gradient-to-r from-green-400 to-white z-0"></div>
                      <div className="absolute inset-[2px] bg-black rounded-lg z-0"></div>
                    </button>
                  )
                ) : (
                  <div className="flex items-center justify-center mt-4 space-x-10">
                    <button
                      onClick={() => handleDecrement(product._id)}
                      className="relative bg-black text-white p-2 w-8 rounded-lg border-2 border-transparent transition-all duration-300 
        hover:shadow-[0_0_10px_rgba(144,238,144,0.8)]"
                    >
                      <span className="relative z-10">-</span>
                      <div className="absolute inset-0 p-[2px] rounded-lg bg-gradient-to-r from-green-400 to-white z-0"></div>
                      <div className="absolute inset-[2px] bg-black rounded-lg z-0"></div>
                    </button>

                    <input
                      type="text"
                      value={cartItems[product._id]?.quantity || 1}
                      readOnly
                      className="w-12 bg-black text-center text-white rounded-lg border-2 border-green-400 transition-all duration-300"
                    />

                    <button
                      onClick={() => handleIncrement(product._id)}
                      className="relative bg-black text-white p-2 w-8 rounded-lg border-2 border-transparent transition-all duration-300 
        hover:shadow-[0_0_10px_rgba(144,238,144,0.8)]"
                    >
                      <span className="relative z-10">+</span>
                      <div className="absolute inset-0 p-[2px] rounded-lg bg-gradient-to-r from-green-400 to-white z-0"></div>
                      <div className="absolute inset-[2px] bg-black rounded-lg z-0"></div>
                    </button>
                  </div>
                )
              }

            </div>
          );
        })}
      </div>

      {/* Login Modal (Placeholder) - Implement actual modal logic */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2>Please Login</h2>
            <button onClick={() => setIsLoginModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}