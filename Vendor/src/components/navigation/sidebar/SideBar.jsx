import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate  , useLocation } from "react-router-dom";
import { FaBars,FaArrowRightFromBracket } from "react-icons/fa6";
// import companyLogo from "../../../assets/company-icon.png";
import { sidebaritems } from "./sidebaritems";
import { useDispatch } from "react-redux";
import { openLogOutModal } from "../../../redux/features/LogoutModalSlice";
import hyperTradeLogo from "../../../assets/hypertrade logo.svg" 
const SideBar = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

 
  const handleLogout = () => {
      dispatch(openLogOutModal())
  };

  return (
    <aside
      className={`sidebar h-full transition-all duration-400 ease-in-out absolute ${
        isExpanded ? "w-48" : "w-16"
      } h-[610px]  shadow-box-shadow flex flex-col z-50 ${themeMode === "theme-mode-dark" ? "gradient-bg-dark text-txt-color" : "gradient-bg-light text-txt-color"}`}
    >
      <div className="top mt-4 mb-3 h-[8%]">
        <div className="logo flex justify-center items-center gap-2" onClick={() => navigate("/hyperTrade/home")}>
          <img src={hyperTradeLogo} alt="HyperTrade" className="w-7 h-7" />
          {isExpanded &&   <span className="text-[#26DC5C] text-md font-brunoAce font-bold">HYPERTRADE</span>}
        </div>

      </div>
      <nav className="menuItems">
        <ul className="flex flex-col gap-5">
         
          <li className="hamburgermenu flex justify-center items-center cursor-pointer" onClick={toggleSidebar}>
            <FaBars />
          </li>
        
          {sidebaritems.map((item, index) => (
            <li key={index} className={`${item.cname} group w-95% min-h-[40px]`}>
              <Link to={item.path}>
              <div
                  className={`flex items-center justify-center p-2 mx-2 ${isExpanded && "pl-4"} hover:bg-main-color hover:text-txt-white hover:rounded-lg transition-all ${
                    location.pathname === item.path ? 'bg-gradient-to-r from-main-color to-second-color text-txt-white rounded-lg' : ''
                  }`}
                >
                
                  {item.icon}
                  {isExpanded && (
                    <span className="ml-2 w-[110px]">{item.title}</span>
                  )}
                  {/* {!isExpanded &&   <div className="absolute left-[65px] opacity-0 group-hover:opacity-100 text-txt-white bg-main-color rounded-lg p-1">{item.title}</div>} */}
                </div>
              </Link>
            </li>
          ))}
          <li className={`flex items-center justify-center cursor-pointer p-2 mx-1 h-[40px] group w-[85%] hover:rounded-lg ${isExpanded && "pl-4 mx-3"} hover:bg-orange-600 transition-all`} onClick={handleLogout}>
            <button className={`flex gap-1 items-center ${themeMode === "theme-mode-dark" ? "text-txt-color" : "text-txt-color"}`} >
              <FaArrowRightFromBracket />
              {isExpanded && (
                    <span className="w-[100px] text-left ml-[1px]">Log Out</span>
                  )}
              {/* {!isExpanded &&  <div className="absolute left-[65px] opacity-0 group-hover:opacity-100 text-red-700 bg-main-color rounded-lg p-1 w-[100px]">Log-Out</div>} */}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
