import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState({});
  const [backendSummary, setBackendSummary] = useState({});
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const lengthofcart = Object.keys(cartItems).length;

  useEffect(() => {
    const fetchProfileFromServer = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found. Skipping profile fetch.");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/profile`,
          {
            headers: {
              token: token,
              "ngrok-skip-browser-warning": "32",
            },
          }
        );
        setAddresses(response.data.data.address || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileFromServer();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping cart fetch.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/cart`,
        {
          headers: {
            token: token,
            "ngrok-skip-browser-warning": "32",
          },
        }
      );

      const fetchedCart = response.data.cart?.items || [];
      const cartItemsFormatted = fetchedCart.reduce((acc, item) => {
        const key = `${item.productId}_${item.variant || "default"}`;
        acc[key] = {
          productId: item.productId,
          productName: item.name,
          variant: item.variant || "original",
          quantity: item.quantity || 1,
          price: item.price || 0,
          image: item.images?.[0] || "default-image.jpg",
        };
        return acc;
      }, {});

      setCartItems(cartItemsFormatted);
      setBackendSummary(response.data.cart || {});
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems({});
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (key, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = {
      ...cartItems,
      [key]: {
        ...cartItems[key],
        quantity: newQuantity,
      },
    };

    setCartItems(updatedCart);
    await postCartToBackend(updatedCart);
    await fetchCart();
  };

  const postCartToBackend = async (updatedCart) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping cart update.");
      return;
    }

    try {
      const items = Object.keys(updatedCart).map((key) => ({
        productId: updatedCart[key].productId,
        variant: updatedCart[key].variant || "original",
        quantity: updatedCart[key].quantity,
      }));

      const payload = {
        items,
        addId: selectedAddressId,
      };

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/update-cart`,
        payload,
        {
          headers: {
            token: token,
            "ngrok-skip-browser-warning": "32",
          },
        }
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const deleteItem = async (key) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[key];
    setCartItems(updatedCart);

    await postCartToBackend(updatedCart);
    await fetchCart();
  };

  const handleAddressSelect = async (event) => {
    const newSelectedAddressId = event.target.value;
    setSelectedAddressId(newSelectedAddressId);

    // Post the updated cart with the new address to the backend
    await postCartToBackend(cartItems);

    // Reload the cart data from the backend
    await fetchCart();
  };

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddressId(addresses[0].addressId);
    }
  }, [addresses]);

  return (
    <div className="bg-black min-h-screen bg-fixed overflow-y-auto">
      <div className="mt-5 ml-28 mb-7">
        <Header duration={9000} borderRadius="1.5rem" lenOfCart={lengthofcart} />
      </div>

      {Object.keys(cartItems).length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8 px-8">
          <div className="lg:w-[70%] space-y-6 mb-6">
            {Object.keys(cartItems).map((key) => (
              <div
                key={key}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-red-600"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={cartItems[key].image}
                    alt={`Product ${cartItems[key].productId}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl text-red-600 mb-2">
                      {cartItems[key].productName}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Variant: {cartItems[key].variant}
                    </p>
                    <div className="flex items-center gap-4">
                      <button
                        className="w-8 h-8 bg-gray-800/50 text-red-600 border border-red-600 flex items-center justify-center hover:bg-gray-700/50"
                        onClick={() =>
                          handleQuantityChange(key, cartItems[key].quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="text-gray-200 text-xl w-12 text-center">
                        {cartItems[key].quantity}
                      </span>
                      <button
                        className="w-8 h-8 bg-gray-800/50 text-red-600 border border-red-600 flex items-center justify-center hover:bg-gray-700/50"
                        onClick={() =>
                          handleQuantityChange(key, cartItems[key].quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 text-2xl font-bold mb-4">
                      ${cartItems[key].price * cartItems[key].quantity}
                    </p>
                    <button
                      className="text-red-500 hover:text-red-400"
                      onClick={() => deleteItem(key)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-[30%]">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-red-600 sticky top-4">
              <h2 className="text-2xl text-red-600 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Total</span>
                  <span>${backendSummary?.beforeDiscount || 0}</span>
                </div>
                <div className="flex justify-between text-green-800">
                  <span>Discount</span>
                  <span>
                    $-{(backendSummary?.beforeDiscount || 0) -
                      (backendSummary?.afterDiscount || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Total (AfterDisount)</span>
                  <span>${backendSummary?.afterDiscount || 0}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>+${backendSummary?.totalShipping || 0}</span>
                </div>


                <div className="flex justify-between text-gray-400">
                  <span>To Pay</span>
                  <span>${backendSummary?.grandtotal || 0}</span>
                </div>
              </div>
              <div className="mb-6">
                <select
                  className="w-full p-2 bg-gray-800 text-gray-200 rounded-lg"
                  value={selectedAddressId || ""}
                  onChange={handleAddressSelect}
                >
                  <option value="" disabled>
                    Select an address
                  </option>
                  {addresses.map((address) => (
                    <option key={address.addressId} value={address.addressId}>
                      {address.address} {/* Customize this with the actual address label */}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="w-full bg-red-600 text-black py-3 rounded-lg font-bold hover:bg-red-700"
                onClick={() => {
                  if (selectedAddressId) {
                    navigate("/paymentGate");
                  } else {
                    alert("Please select an address before proceeding.");
                  }
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-300 text-2xl">No products in cart</p>
        </div>
      )}
    </div>
  );
}

export default Cart;