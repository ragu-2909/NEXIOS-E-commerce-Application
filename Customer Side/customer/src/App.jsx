import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage"; // Import your LoginPage component
import Profile from "./ProfilePage";
import SignUp from "./SignUp";
import Disc from "./ProdDisc";
import AllProd from "./AllProd";
import Cart2 from "./Cart2";
import axios from "axios";
import Cart from "./Cart";
import { useState,useEffect } from "react";
import Paygate from "./Paygate";
import Cart3 from "./Cart3";

function App() {
  const [cartItems, setCartItemss] = useState({});
  const [price, setPrice]= useState(0);

  function setCartItems(data) {
    setCartItemss(data);
  }

  const fetchCartFromBackend = async () => {
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

      const fetchedCart = response.data.cart.items || [];
      setPrice(response.data.cart.grandtotal);
      console.log(response.data.cart.afterDiscount)
      const cartItemsFormatted = fetchedCart.reduce((acc, item) => {
        const key = `${item.productId}_${item.variant || "default"}`;
        acc[key] = {
          productId: item.productId,
          variant: item.variant || "original",
          quantity: item.quantity || 1,
        };
        return acc;
      }, {});

      setCartItems(cartItemsFormatted);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems({});
    }
  };
   const [addresses, setAddresses] = useState([]);
  
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
  

  const postCartToBackend = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping cart update.");
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

  useEffect(() => {
    fetchCartFromBackend();
  }, []);

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      postCartToBackend();
    }
  }, [cartItems]);

  const lengthofcart = Object.keys(cartItems).length;
  
  return (
    <Router>
      <div className="flex flex-col overflow-y-auto justify-normal min-h-screen bg-gradient-to-br from-[#411616] via-gray-900 via-40% to-gray-950 h-screen">
       
        
        <Routes>
          <Route path="/" element={<LandingPage 
          cartItems={cartItems}
          setCartItems={setCartItems}/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path ="/profile" element = {<Profile lengthofcart={lengthofcart}/>}/>
          <Route path = "/signup" element = {<SignUp/>}/>
          <Route path="/products/:productId" element={<Disc cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/allproducts" element={<AllProd/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/dis/:category" element={<Cart2 cartItems={cartItems} setCartItems={setCartItems}/>}/>
          <Route path="/cis/:vendorId/:vendorName" element={<Cart3 cartItems={cartItems} setCartItems={setCartItems}/>}/>
          <Route path="/paymentGate" element={<Paygate price = {price}/>}/>
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
