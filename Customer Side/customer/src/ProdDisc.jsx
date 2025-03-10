import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "./FetchProd";
import { Header } from "./components/Header";
import axios from "axios";
import QuestionModal from "./QuestionModel";
import RatingStatistics from "./RatingStat";
import { ShoppingCartIcon, UserIcon, HomeIcon, StarIcon } from 'lucide-react';
import { Navigate } from "react-router-dom";

function ProdDisc({ cartItems, setCartItems }) {
  const [productArr, setProductArr] = useState([]);
  const [quantity1, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [prodQ, setProdQ] = useState("");
  const [showAnswers, setShowAnswers] = useState({});
  const [answers, setAnswers] = useState({});
  const [questionModel, setQuestionModel] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isUpdateCartLoading, setIsUpdateCartLoading] = useState(false);
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);
  const navigate = useNavigate()
  const [showAnswerBox, setShowAnswerBox] = useState({});


  const toggleAnswerBox = (quesId) => {
    setShowAnswerBox(prev => ({
      ...prev,
      [quesId]: !prev[quesId]
    }));
  };



  const toggleReviewForm = () => {
    setReviewFormVisible(!isReviewFormVisible); // Toggle visibility of the review form
  };

  const toggleAnswerVisibility = (quesId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [quesId]: !prev[quesId],
    }));
  };
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


  const handleAnswerChange = (quesId, value) => {
    setAnswers((prev) => {
      const updatedAnswers = { ...prev };
      if (value === "") {
        delete updatedAnswers[quesId]; // Remove quesId if value is empty
      } else {
        updatedAnswers[quesId] = value; // Update the value for quesId
      }
      return updatedAnswers;
    });
  };

  console.log(answers)



  //varient section used whilile adding to cart
  prodQ.hasVariant && console.log(prodQ.quantity[selectedQuantity].type);
  console.log(prodQ)

  const tokenexist = true;


  const updateCartToBackend = async (cartItems) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to add items to cart");
      return false;
    }

    setIsUpdateCartLoading(true);
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

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/update-cart`,
        payload,
        {
          headers: {
            token: token,
            "ngrok-skip-browser-warning": "32",
          },
        }
      );

      console.log("Cart updated:", response.data.data.items);
      return true;
    } catch (error) {
      console.error("Error updating cart:", error);
      setError("Failed to update cart. Please try again.");
      return false;
    } finally {
      setIsUpdateCartLoading(false);
    }
  };

  const handleAddToCart = async (productId, variant) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to add items to cart");
      return;
    }

    if (prodQ.hasVariant && selectedQuantity === undefined) {
      setError("Please select a variant");
      return;
    }

    const key = `${productId}_${variant || "default"}`;

    try {
      setIsAddedToCart(true);
      const newCart = {
        ...cartItems,
        [key]: {
          productId: productId,
          variant: variant || "original",
          quantity: (cartItems[key]?.quantity || 0) + quantity1,
        },
      };

      const success = await updateCartToBackend(newCart);
      if (success) {
        setCartItems(newCart);
        setError(null);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add item to cart. Please try again.");
      setIsAddedToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);

      if (isAddedToCart) {
        const key = `${productId}_${prodQ.quantity[selectedQuantity]?.type || "default"}`;
        const newCart = {
          ...cartItems,
          [key]: {
            ...cartItems[key],
            quantity: newQuantity,
          },
        };
        updateCartToBackend(newCart);
        setCartItems(newCart);
      }
    }
  };

  const handleIncrease = () => handleQuantityChange(quantity1 + 1);
  const handleDecrease = () => {
    if (quantity1 > 1) {
      handleQuantityChange(quantity1 - 1);
    } else {
      setIsAddedToCart(false);
      setQuantity(1);
    }
  };





  const handleSubmitAnswer = async (quesId) => {
    const answer = answers[quesId];
    if (!answer) {
      alert("Answer cannot be empty!");
      return;
    }

    const body = {
      quesId: quesId,
      answer: answer,
    };

    const token = localStorage.getItem('token');
    const BASE_URL = import.meta.env.VITE_BASE_URL; // adjust this

    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/user/answerQues/${productId}`,
        data: body,
        headers: {
          "Content-Type": "application/json",
          token: token,
          "ngrok-skip-browser-warning": "32"
        }
      });


      if (response.data) {
        alert("Answer submitted successfully!");
        // Optionally update the UI or fetch updated data
      }
    } catch (error) {
      // More detailed error logging
      if (error.response) {
        // Server responded with a status code outside of 2xx
        console.error("Error response:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Error in setting up the request
        console.error("Error setting up request:", error.message);
      }
      alert("An error occurred while submitting the answer.");
    }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText.trim()) {
      setError("Please provide a rating and write your review.");
      return;
    }

    const token = localStorage.getItem("token");

    const reviewData = {
      productId: productId,
      ratings: rating.toString(),
      review: reviewText,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/addReview`, reviewData, {
        headers: {
          "Content-Type": "application/json",
          token: token,
          "ngrok-skip-browser-warning": "32",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setError(null);
        setReviewText("");
        setRating(0); // Reset the form
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit your review.");
      setSuccess(false);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts('/products');
      if (response && response.data && response.data.data) {
        setProductArr(response.data.data);
      } else {
        console.error("Failed to fetch products or invalid response structure.");
      }
    };

    getProducts();
  }, []);

  const product = productArr.find((p) => p._id === productId);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts('/products');
      if (response && response.data && response.data.data) {
        setProductArr(response.data.data);
      } else {
        console.error("Failed to fetch products or invalid response structure.");
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getProductsInfo = async () => {
      const response = await fetchProducts(`/product/${productId}`);
      if (response && response.data && response.data.data) {
        setProdQ(response.data.data);
      } else {
        console.error("Failed to fetch products or invalid response structure.");
      }
    };

    getProductsInfo();
  }, []);
  console.log(prodQ)




  if (!product) {
    return <div>Product not found</div>;
  }

  const { image, name, vendorName, price, discount, description, subCategory, variantType, hasVariant, quantity, weight, hasReviews, reviews } = product;
  const discountedPrice = price * (1 - (discount?.vendor.disc || 0) / 100);
  const savings = price - discountedPrice;

  console.log(discount.vendor.disc)


  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? image.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === image.length - 1 ? 0 : prevIndex + 1));
  };
  const openQuestionModel = () => {
    setQuestionModel(true);
  }


  return (

    <div className="bg-gradient-to-br from-[#2e1515c1] via-[#180606] to-[#000000] bg-fixed min-h-screen overflow-y-auto text-white">

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
          
          .description-container {
            position: relative;
            background: linear-gradient(180deg, rgba(40,13,13,0.3) 0%, rgba(40,19,4,0.3) 100%);
            border: 1px solid rgba(255,55,55,0.1);
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
            overflow: hidden;
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
      </header>
      <div className="flex flex-col lg:flex-row justify-center mx-5 mt-20">

        {/* Left Image Slider: Fixed */}
        <div className="relative w-full lg:w-2/5 lg:sticky lg:top-10 h-fit">

          <div className="relative">
            <button
              onClick={handlePreviousImage}
              className="absolute text-white top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-gray-600 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="5" y1="12" x2="9" y2="16" />
                <line x1="5" y1="12" x2="9" y2="8" />
              </svg>
            </button>
            <img
              src={image[currentImageIndex]}
              alt={`Product Image ${currentImageIndex + 1}`}
              className="w-full h-96 object-contain rounded-lg"
            />
            <button
              onClick={handleNextImage}
              className="absolute text-white top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-gray-600 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="15" y1="16" x2="19" y2="12" />
                <line x1="15" y1="8" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 mt-4 px-44 overflow-x-auto py-2">
            {image.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 ${index === currentImageIndex
                  ? 'border-2 border-blue-500'
                  : 'border border-gray-200'
                  } rounded-md overflow-hidden transition-all duration-200`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover"
                />
              </button>
            ))}
          </div>

          <div>
            {hasReviews && (
              <div className="bg-transparent mt-6 rounded-lg">

                <RatingStatistics reviews={reviews} />
              </div>
            )}
          </div>
        </div>


        {/* Right Product Details: Scrollable */}
        <div className="lg:w-3/5 overflow-y-auto px-5 ">
          <div className="space-y-3">

            <h1 className="text-5xl ml-5 mb-6 bg-gradient-to-br font-orbitron from-[#e2d9d8] to-[#746b5c] text-transparent bg-clip-text mt-3  font-bold  ">{name}</h1>
            <p className="text-xs  font-light text-gray-400 ml-5 -translate-y-3 font-orbitron tracking-wide">Sold by: {vendorName}</p>
            <p className="text-xs font-light text-gray-600 ml-5 -translate-y-6 font-orbitron tracking-wide">Category: {subCategory}</p>
            {discountedPrice !== price ? (
              <>
                <p className="text-5xl ml-4 font-extrabold font-bebas bg-gradient-to-br from-[#f55145] to-[#3d0905] text-transparent bg-clip-text">
                  ₹{discountedPrice.toFixed(2)}
                </p>
                <div className="flex flex-row justify-normal">
                  <p className="text-xl line-through text-gray-500 ml-4 -translate-y-3 font-orbitron tracking-wide">₹{price}</p>
                  <p className="text-ls ml-4 -translate-y-3 font-semibold bg-gradient-to-br from-[#8ccc90] to-[#249620] text-transparent bg-clip-text">
                    {discount.vendor.disc}% Off
                  </p>
                </div>
                <p className="text-ls ml-4 -translate-y-3 font-semibold text-green-600">
                  You save ₹{savings.toFixed(2)}!
                </p>
              </>
            ) : (
              <p className=" text-4xl ml-4 font-orbitron  font-extrabold bg-gradient-to-br from-[#f55145] to-[#3d0905] text-transparent bg-clip-text">₹{price}</p>
            )}



            <div className={`flex flex-row justify-normal ${hasVariant && quantity[1] ? 'gap-16' : 'gap-1'}`}>

              <div>
                {hasVariant && quantity[1] ? (
                  <div className="ml-3 w-fit p-3 border-mars-200 shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_3px_#ff3737,0_0_8px_#ff3737,0_0_15px_#ff3737]">
                    <p className="text-2xl font-light text-gray-200 ml-5 font-bebas">{variantType}</p>
                    <div className="flex space-x-3 ml-2 mt-2">
                      {quantity.map((q, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedQuantity(index)}
                          className={`px-4 py-2 border font-semibold rounded-md ${selectedQuantity === index
                            ? 'text-white bg-red-500 border-red-600'
                            : 'text-gray-800 bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                          {q.type}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>


              <div>
                {error && (
                  <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow">
                    {error}
                  </div>
                )}

                {/* Modify the Add to Cart button section */}

                {isAddedToCart ? (
                  <div className="flex  items-center space-x-2 ">
                    <button
                      className="px-4 py-2 border text-xl font-extrabold border-red-600 rounded-l disabled:opacity-50"
                      onClick={handleDecrease}
                      disabled={isUpdateCartLoading}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity1}
                      readOnly
                      className="w-16 text-center text-ls font-semibold bg-black border-t border-b border-red-600"
                    />
                    <button
                      className="px-4 py-2 text-xl border font-extrabold border-red-600 rounded-r disabled:opacity-50"
                      onClick={handleIncrease}
                      disabled={isUpdateCartLoading}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className={`inline-flex items-center justify-center 
              h-16 w-44 p-5 text-2xl font-bold rounded-md 
              border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
              bg-[length:200%_100%] animate-shimmer 
              text-red-600 font-bebas transition-transform 
              focus:outline-none focus:ring-2 focus:ring-slate-400 
              focus:ring-offset-2 focus:ring-offset-slate-50 
              dark:from-zinc-700 dark:to-zinc-900 
              disabled:opacity-50 
              hover:translate-y-[0.25rem] hover:scale-[1.05]`}


                    onClick={() => handleAddToCart(productId, prodQ.quantity[selectedQuantity]?.type)}
                    disabled={isUpdateCartLoading}
                  >
                    {isUpdateCartLoading ? "Adding..." : "Add To Cart"}
                    <BottomGradient />
                  </button>
                )}
              </div>
            </div>


            <div className="description-container">
              <h2 className="description-header">Product Specifications</h2>
              <p className="description-text">
                {description}
              </p>
              <p className="weight-info">
                UNIT MASS: {weight} KG
              </p>
            </div>



            {/* Reviws and q&a */}




          </div>
        </div>


        {/* out from here*/}


      </div>

      {/*Reviws sectiomn */}
      <div className="flex flext-col justify-between  gap-9">
        <div className="ml-3 w-2/5">
          <div className="sci-fi-container">
            <h2 className="sci-fi-header">User Reviews</h2>
            {hasReviews ? (
              <div className="space-y-6">
                {reviews.map((review, index) => (

                  <div key={index} className="flex items-start review-card">

                    <img
                      src={review.userpic}
                      alt={review.name}
                      className="w-12 mr-2 h-12 rounded-full border-2 border-gray-600"
                    />
                    <div className="flex flex-col justify-normal">
                      <div className=" flex flex-row justify-between review-header">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg">{review.name}</h3>
                            <div className="rating-stars flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill={i < review.ratings ? "#ff3737" : "#4a1414"}
                                  viewBox="0 0 24 24"
                                  className="w-5 h-5"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="absolute right-2 mr-2">
                          <span className="text-sm text-gray-400">{review.reviewDateTime}</span>
                        </div>
                      </div>

                      <div>
                        <p className="review-text">{review.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="review-text">No reviews yet.</p>
            )}

            {/* Add Review Button */}
            {!isReviewFormVisible && (
              <button
                onClick={toggleReviewForm}
                className="sci-fi-button font-bold"
              >
                Add Review
              </button>
            )}

            {/* Add Review Form */}
            {isReviewFormVisible && (
              <div className="mt-8">
                <h3 className="sci-fi-header">Add Review</h3>
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="sci-fi-input"
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <div className="rating-stars my-4">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className="text-3xl"
                        onMouseEnter={() => setHovered(i + 1)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={i < (hovered || rating) ? "#ff3737" : "#4a1414"}
                          viewBox="0 0 24 24"
                          className="w-8 h-8"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <button type="submit" className="sci-fi-button ml-28">Submit Review</button>
                  {/* Optional Cancel Button */}
                  <button
                    type="button"
                    onClick={() => setReviewFormVisible(false)}
                    className="ml-4 text-gray-500"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>



        {questionModel && (
          <QuestionModal
            isOpen={questionModel}
            onClose={() => setQuestionModel(false)}
            productId={productId} // Replace with your actual product ID
            token={localStorage.getItem('token')} // Replace with your actual auth token
          />
        )}






        {/* //Question ans section  */}
        <div className="w-7/12 mr-10 ">
          <div className="sci-fi-container">
            <div className="flex flex-row justify-between items-center mb-8">
              <h1 className="font-orbitron text-2xl text-red-500 tracking-wider">Q&A</h1>
              <button
                onClick={openQuestionModel}
                className="px-6 py-3 bg-gradient-to-r from-red-900 to-red-600 text-red-100 
                     font-orbitron rounded-md border border-red-500/50 hover:from-red-800 
                     hover:to-red-500 transition-all duration-300 shadow-lg shadow-red-900/30
                     tracking-wider text-sm"
              >
                + ASK
              </button>
            </div>

            {prodQ.hasQuestions && (
              <div className="space-y-8">
                {prodQ.questions?.map((item) => (
                  <div key={item.quesId} className="bg-gray-900/10 p-4 rounded-xl border border-red-500/20">
                    {/* Question Section */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-orbitron text-red-500 text-xl">Q.</span>
                        <h2 className="text-ls text-gray-100 font-orbitron tracking-wide">{item.text}</h2>
                      </div>
                    </div>

                    {/* Answers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {item.isAnswered ? (
                        item.answers.map((answer, idx) => (
                          <div
                            key={idx}
                            className={`relative p-4 rounded-lg transition-all duration-300 hover:transform hover:scale-[1.02]
                                  ${answer.isVendor
                                ? "bg-gradient-to-br from-gray-900/30 to-red-900/30 border-2 border-red-500/30 shadow-lg shadow-red-500/20"
                                : "bg-gray-800/20 border border-gray-700"}`}
                          >
                            {answer.isVendor && (
                              <div className="absolute -top-3 -right-3 bg-red-500 text-xs text-white px-2 py-1 rounded-full font-orbitron">
                                VERIFIED VENDOR
                              </div>
                            )}

                            <div className="flex items-start gap-4">
                              <img
                                src={answer.profilePic || "/api/placeholder/40/40"}
                                alt="Profile"
                                className={`w-10 h-10 rounded-full border-2 ${answer.isVendor ? 'border-red-500' : 'border-gray-600'}`}
                              />
                              <div className="flex-1">
                                <div className="text-gray-300 mb-2">{answer.text}</div>
                                <div className="text-sm text-gray-400 font-mono">
                                  Answered by: <span className="text-red-400">{answer.answeredBy}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-400 font-mono">No answers recorded in database.</div>
                      )}
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() => toggleAnswerBox(item.quesId)}
                        className="px-6 py-2 bg-gradient-to-r from-red-900/50 to-red-800/50 text-red-100 
                             font-orbitron rounded-lg border border-red-500/30 hover:from-red-800/70 
                             hover:to-red-700/70 transition-all duration-300 text-sm"
                      >
                        {showAnswerBox[item.quesId] ? 'CANCEL' : 'ADD ANSWER'}
                      </button>
                    </div>

                    {/* Answer Input Section */}
                    {showAnswerBox[item.quesId] && (
                      <div className="mt-4 space-y-3">
                        <input
                          placeholder="Share your knowledge..."
                          value={answers[item.quesId] || ''}
                          onChange={(e) => handleAnswerChange(item.quesId, e.target.value)}
                          className="w-full p-3 rounded-lg bg-gray-800/50 text-gray-300 border border-red-500/20 
                               focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300
                               font-mono placeholder-gray-500"
                        />
                        <button
                          onClick={() => handleSubmitAnswer(item.quesId)}
                          className="w-full py-3 bg-gradient-to-r from-red-900 to-red-700 text-red-100 
                               font-orbitron rounded-lg border border-red-500/50 hover:from-red-800 
                               hover:to-red-600 transition-all duration-300"
                        >
                          SUBMIT RESPONSE
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div >
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-700 to-transparent" />
    </>
  );
};


export default ProdDisc;
