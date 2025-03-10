import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ThemeMenu from "../../Themes/ThemeMenu/ThemeMenu";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { current } from "@reduxjs/toolkit";

const HeadNavBar = () => {
  const vendorInfo = useSelector((state) => state.vendorInfo.vendorInfo);
  const [vendorName, setVendorName] = useState(
    localStorage.getItem("vendorName")
  );
  const [vendorImage, setVendorImg] = useState(
    localStorage.getItem("vendorImg")
  );
  const currentUser = !vendorInfo
    ? {
        displayName: vendorName || "vendor Mars",
        image: vendorImage,
      }
    : {
        displayName: vendorInfo.name,
        image:
          Array.isArray(vendorInfo.image) && vendorInfo.image.length > 0
            ? vendorInfo.image[0]
            : vendorImage,
      };

  const navigate = useNavigate();
  const handleProfilePage = () => {
    navigate("/hyperTrade/profilepage");
  };

  // const [vendorName,setVendorName] = useState(localStorage.getItem("vendorName"))
  // const  [vendorImage,setVendorImg] = useState(localStorage.getItem('vendorImg'))
  // const currentUser = {
  //   displayName : vendorName || 'Vendor Mars',
  //   image: vendorImage,
  // }

  return (
    <div className="topNav p-[30px] flex items-center justify-between h-[65px] shadow-box-shadow z-10">
      <div className="topnavSearch relative flex items-center bg-main-bg rounded-md h-[40px] gap-2 pr-2 overflow-hidden shadow-box-shadow">
        <input
          type="text"
          placeholder="Search here ...."
          className="w-full h-full text-[1rem] text-txt-color pt-2 pr-16 pb-2 pl-5 rounded-lg bg-main-bg border-0 focus:border-0"
        />
        <button className="searc">
          <FaMagnifyingGlass className="text-zinc-500 text-[1.25rem]" />
        </button>
      </div>
      <div className="topnavRight flex items-center">
        <div className="topnavRight flex items-center">
        <div className="topnavRightItems profile flex justify-between items-center cursor-pointer" onClick={handleProfilePage}>
        <div className="w-12 h-12 border-[2px] rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          <img src={currentUser.image} alt="user image" className="w-full h-full rounded-full object-cover" />
        </div>
        <p className="ml-4 text-lg font-semibold">{currentUser.displayName}</p>
      </div>
        </div>

        <div className="topnavRightItems ml-[30px] themeSettings">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default HeadNavBar;
