import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import axios from 'axios';


import { AnimatePresence, motion } from 'framer-motion';
import "./App.css"
import { useNavigate } from 'react-router-dom';

export const CarouselContext = createContext({
  onCardClose: () => { },
  currentIndex: 0,
});

const ProdCard = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);





  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 230 : 384; // mobile check
      const gap = window.innerWidth < 768 ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth hide-scrollbar"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>
          <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2 * index, ease: 'easeOut' },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Conditional rendering for navigation buttons */}
        {items.length >= 4 && (
          <div className="flex justify-end gap-2 mr-10 -translate-y-9">
            <button
              className="relative z-40 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center disabled:opacity-50"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="5" y1="12" x2="9" y2="16" />
                <line x1="5" y1="12" x2="9" y2="8" />
              </svg>

            </button>
            <button
              className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="15" y1="16" x2="19" y2="12" />
                <line x1="15" y1="8" x2="19" y2="12" />
              </svg>

            </button>
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  )
}

const PCard = ({ key,card, index, layout = false, cartItems, setCartItems }) => {
  const [open, setOpen] = useState(false);
  const { onCardClose } = useContext(CarouselContext);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

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
        addId: addresses[0].addressId,
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

      console.log("Cart successfully updated on the server:", response.data.data.items);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  const tokenexist = true;

  const handleAddToCartt = (productId, variant) => {
    if (!tokenexist) {
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
  console.log(cartItems);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-y-auto">
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full relative inset-0"
            /> */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl bg-black/80 backdrop-blur-lg  inset-0  mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>

              </button>
              <div className='flex flex-row justify-normal gap-4'>
                <div className='w-1/2 h-1/2'>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto rounded-3xl mb-4"
                  />

                </div>
                <div>

                  <p className="text-base font-medium text-black dark:text-white">
                    {card.category}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bebas font-semibold text-gray-100 mt-4 dark:text-white">
                    {card.title}
                  </h2>
                  <p className="text-xl text-white font-medium mt-2">Price: {card.price}</p>
                  <p className="text-lg text-green-700 font-medium mt-2">Discount: {card.discount}</p>
                  <div className="py-4 text-white">{card.content}</div>
                  <button
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
                    onClick={() => handleAddToCartt(index, card.category)}

                  >
                    Add to Cart
                  </button>
                  <button
                    className="mt-4 bg-blue-600 text-white  ml-4 py-2 px-4 rounded-lg"
                    onClick={()=>{
                      navigate(`/products/${index}`)
                    }}
                  >
                    Visit Product Page
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        className="flex flex-col bg-gray-100 dark:bg-neutral-900 h-auto w-1/2 md:w-96 overflow-hidden rounded-3xl"
        onClick={handleOpen}
      >
        {/* Product Image Section */}
        <div className="w-full h-56">
          <img
            src={card.image}
            alt={card.title}
            className="h-full w-full object-cover rounded-t-3xl"
          />
        </div>

        {/* Product Details Section */}
        <div className="w-1/2  p-4 flex flex-col items-start">
          <h3 className="text-2xl font-bold text-gray-100">{card.title}</h3>
          <p className="text-xl text-gray-50 font-extrabold mt-2">{card.price}</p>
          <p className="text-sm text-green-600 mt-1">Discount: {card.discount}</p>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevents the modal from opening when clicking the button
              const token = localStorage.getItem("token");
              if(token){
                alert("Added to Cart!");
              }else{
                navigate('/login');
              }
             
              handleAddToCartt(index, card.category)
            }}
          >
            Add to Cart
          </button>
        </div>
      </motion.div>

    </>
  );
};


// Explicitly export both Carousel and Card components
export { ProdCard, PCard };
