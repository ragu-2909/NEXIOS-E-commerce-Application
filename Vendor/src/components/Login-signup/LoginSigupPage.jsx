import React from "react";
import bgImg from "../../assets/marsbg5.jpg"; 

import ImageCarousel from './ImageCarousel'
import { Outlet } from "react-router-dom";


const LoginSignupPage = ()  => {
 

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }} 
    >
      <div className='w-[70%] h-[80%] px-4 py-2 bg-black bg-opacity-50 rounded-xl flex justify-between items-center'>
        <ImageCarousel />
      
        <Outlet />

      </div>
    </div>
  );
}

export default LoginSignupPage;
