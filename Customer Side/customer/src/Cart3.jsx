import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, HomeIcon, StarIcon } from 'lucide-react';
import axios from 'axios';
import { fetchProducts } from './FetchProd';
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-[#110707] via-[#210505] to-[#000000] bg-fixed backdrop-blur-lg border-b border-gray-800">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="bg-gradient-to-br from-[#f55145] to-[#3d0905] text-transparent bg-clip-text font-extrabold text-4xl">NEXIOS</h1>

            <div className="ml-10 flex items-baseline space-x-4 ">
              <button onClick={() => navigate('/')} className="text-gray-300 font-orbitron tracking-wide hover:text-red-600 px-3 py-2 rounded-md text-ls font-medium">
                <HomeIcon className="inline mr-2" size={18} />Home
              </button>
              <button onClick={() => navigate('/cart')} className="text-gray-300 font-orbitron tracking-wide hover:text-red-600 px-3 py-2 rounded-md text-ls font-medium">
                <ShoppingCartIcon className="inline mr-2" size={18} />Cart
              </button>
              <button onClick={() => navigate('/profile')} className="text-gray-300 font-orbitron tracking-wide hover:text-red-600 px-3 py-2 rounded-md text-ls font-medium">
                <UserIcon className="inline mr-2" size={18} />Account
              </button>
            </div>
          </div>

        </div>
        <div className=" bg-gradient-to-r from-red-600/10 via-red-700 dark:via-red-800 to-from-red-600/10  h-[1px] w-full" />
      </nav>
    </header>)
};

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-bl from-gray-900/60 to-slate-600/15 rounded-xl p-4 hover:scale-105 transition-transform">

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

       .description-container {
  position: relative;
  background: linear-gradient(180deg, rgba(40, 13, 13, 0.3) 0%, rgba(40, 19, 4, 0.3) 100%);
  border: 1px solid rgba(255, 55, 55, 0.1);
  border-radius: 8px;
  padding: 1rem; /* Reduced padding for better spacing */
  margin-top: -1.25rem; /* Matches the -translate-y-9 */
  overflow: scroll;
}


          .description-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #ff3737, transparent);
            animation: scanline 2s linear infinite;
          }

          .description-container::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #ff3737, transparent);
            animation: scanline 2s linear infinite reverse;
          }

          @keyframes scanline {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .description-text {
            font-family: 'Share Tech Mono', monospace;
            line-height: 1.6;
            position: relative;
          }

          .description-text::before {
            content: '>';
            color: #ff3737;
            margin-right: 8px;
            font-family: 'Share Tech Mono', monospace;
          }

          .description-header {
            font-family: 'Orbitron', sans-serif;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            color: #ff3737;
            text-shadow: 0 0 10px rgba(255,55,55,0.5);
          }

          .weight-info {
            font-family: 'Rajdhani', sans-serif;
            color: #a0a0a0;
            border-top: 1px solid rgba(255,55,55,0.2);
            margin-top: 1rem;
            padding-top: 1rem;
          }
        `}
      </style>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
          
          .sci-fi-container {
            position: relative;
            background: linear-gradient(180deg, rgba(40,13,13,0.3) 0%, rgba(40,19,4,0.3) 100%);
            border: 1px solid rgba(255,55,55,0.1);
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
            overflow: hidden;
          }

        
         .sci-fi-header {
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  color: #ff1e14; /* Brighter red */
  text-shadow: 0 0 10px rgba(255, 55, 55, 0.5);
}


          .review-card {
            background: linear-gradient(135deg, rgba(40,13,13,0.4) 0%, rgba(40,19,4,0.4) 100%);
            border: 1px solid rgba(255,55,55,0.2);
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1rem 0;
            position: relative;
            overflow: hidden;
          }

          .review-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255,55,55,0.5), transparent);
          }

          .review-header {
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            color: #ff3737;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }

          .review-text {
            font-family: 'Share Tech Mono', monospace;
            color: #e0e0e0;
            line-height: 1.6;
          }

          .qa-section {
            border-left: 2px solid rgba(255,55,55,0.3);
            padding-left: 1rem;
            margin: 1rem 0;
          }

          .question {
            font-family: 'Orbitron', sans-serif;
            color: #ff3737;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }

          .answer {
            font-family: 'Share Tech Mono', monospace;
            color: #e0e0e0;
            padding: 1rem;
            background: rgba(40,13,13,0.3);
            border-radius: 4px;
          }

          .sci-fi-button {
            font-family: 'Rajdhani', sans-serif;
            background: linear-gradient(45deg, #2a0808, #400a0a);
            border: 1px solid rgba(255,55,55,0.3);
            color: #ff3737;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            overflow: hidden;
          }

          .sci-fi-button:hover {
            background: linear-gradient(45deg, #400a0a, #2a0808);
            border-color: rgba(255,55,55,0.6);
            text-shadow: 0 0 10px rgba(255,55,55,0.5);
          }

          .sci-fi-input {
            font-family: 'Share Tech Mono', monospace;
            background: rgba(40,13,13,0.3);
            border: 1px solid rgba(255,55,55,0.3);
            color: #e0e0e0;
            padding: 0.5rem;
            border-radius: 4px;
            width: 100%;
            margin: 0.5rem 0;
          }

          .sci-fi-input:focus {
            outline: none;
            border-color: rgba(255,55,55,0.6);
            box-shadow: 0 0 10px rgba(255,55,55,0.2);
          }

          @keyframes scanline {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .rating-stars {
            display: inline-flex;
            gap: 4px;
          }

          .rating-stars svg {
            filter: drop-shadow(0 0 2px rgba(255,55,55,0.5));
          }
        `}
      </style>
      <div
        className="relative mb-4 cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <span className="absolute top-2 right-2 bg-red-500/20 text-red-500 px-2 py-1 rounded-full text-xs">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <h3 className="font-semibold bg-gradient-to-br font-orbitron from-[#e2d9d8] to-[#b1a899] text-transparent bg-clip-text  mb-2  cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}>
        {product.name}
      </h3>
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
        <StarIcon className="text-yellow-500" size={16} />
        <span>{
          product.reviews?.length > 0
            ? (product.reviews.reduce((acc, rev) => acc + parseInt(rev.ratings), 0) / product.reviews.length).toFixed(1)
            : "No ratings"
        }</span>
        <span>({product.reviews?.length || 0} reviews)</span>
      </div>
      <div className="flex items-center justify-between mb-4">

        <span className="text-2xl font-bold bg-gradient-to-br from-[#f55145] to-[#a46b67] text-transparent bg-clip-text">₹{product.price}</span>
      </div>
      <button
        onClick={() => onAddToCart(product._id, product.hasVariant ? product.quantity[0].type : "original")}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
      >
        <ShoppingCartIcon size={18} />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

const VendorDisplay = ({ cartItems, setCartItems }) => {
  const { vendorId } = useParams();
  const{vendorName} = useParams();
  const [products, setProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [addresses, setAddresses] = useState([]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  console.log(products)

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts('/products');
      if (response?.data?.data) {
        const categoryProducts = response.data.data.filter(
          product => product.vendorId === vendorId
        );
        setProducts(categoryProducts);
      }
    };


    const fetchAddresses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

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

    getProducts();
    fetchAddresses();
  }, [vendorId]);

  const updateCartToBackend = async (cartItems) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const items = Object.keys(cartItems).map((key) => ({
        productId: cartItems[key].productId,
        variant: cartItems[key].variant || "original",
        quantity: cartItems[key].quantity,
      }));

      const payload = {
        items,
        addId: addresses[0]?.addressId,
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

  const handleAddToCart = (productId, variant) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    const key = `${productId}_${variant || "default"}`;
    setCartItems((prevCart) => {
      const newCart = {
        ...prevCart,
        [key]: {
          productId: productId,
          variant: variant || "original",
          quantity: prevCart[key] ? prevCart[key].quantity + 1 : 1,
        },
      };
      updateCartToBackend(newCart);
      return newCart;
    });
  };

  const subcategories = ['all', ...new Set(products.map(p => p.subCategory))];
  const filteredProducts = selectedSubCategory === 'all'
    ? products
    : products.filter(p => p.subCategory === selectedSubCategory);

  return (
    <div className="bg-gradient-to-r from-[#1c1111] to-[#000000] bg-fixed text-gray-100 min-h-screen overflow-y-auto">
      <Header />
      <main className="pt-32 max-w-8xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          <aside className="col-span-2">
            <div className=" description-container overflow-y-scroll max-h-[800px] -translate-y-40 sticky top-32 space-y-6">
              <div className="bg-gradient-to-r from-[#100808] to-[#000000] rounded-lg p-4">
                <h3 className="text-xl font-bold mb-4">Subcategories</h3>
                <div className="space-y-2">
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubCategory(sub)}
                      className={`flex items-center space-x-2 w-full text-left px-2 py-1 rounded capitalize ${selectedSubCategory === sub
                          ? 'text-red-600'
                          : 'text-gray-400 hover:text-red-600'
                        }`}
                    >
                      <span>{sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>


          <div className="col-span-10">
            <h2 className="text-2xl font-bold mb-8">{vendorName}</h2>
            <div className="grid grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDisplay;