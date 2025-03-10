import React,{useState,useEffect} from "react";
import { FaPhone, FaCertificate,  FaEarthAsia, FaLocationDot, FaPenToSquare } from 'react-icons/fa6';
import bannerImg from "../../../assets/welcomebannerImg.png"
import { useSelector,useDispatch } from "react-redux";
import { Outlet,useNavigate } from "react-router-dom";
import { fetchVendorInfo } from "../../../redux/features/VendorInfoSlice"
const ProfilePage = () => {
   const dispatch = useDispatch()
   useEffect(() => {
       dispatch(fetchVendorInfo());
     }, []);
     const navigate = useNavigate()
    const themeMode = useSelector((state) => state.theme.mode);
    const vendorInfo = useSelector((state) => state.vendorInfo.vendorInfo)
    const [vendorName,setVendorName] = useState(localStorage.getItem("vendorName"))
      const  [vendorImage,setVendorImg] = useState(localStorage.getItem('vendorImg'))
      const currentUser = (!vendorInfo) ? {
        banner : bannerImg,
        displayName : "vendor Mars",
        image: vendorImage,
        phone : 99999999999,
        licencenum : "658ISSMRS",
        address : "Sector 4, Colony-3 , Mars",
        pincode : "MRS111",
      } : {
        banner : bannerImg,
        displayName : vendorInfo.name,
        image: Array.isArray(vendorInfo.image) && vendorInfo.image.length > 0 ? vendorInfo.image[0] : vendorImage,
        phone : vendorInfo.telnum,
        licencenum : vendorInfo.licencenum,
        address : vendorInfo.address,
        pincode : vendorInfo.pincode,
      } 
    
      const handleEditProfile = () => {
        navigate("/hyperTrade/profilepage/editprofile")
      }

  return (
    <div className={`w-full h-full rounded-lg shadow-lg ${themeMode === "theme-mode-dark" ? "gradient-bg-dark text-txt-white" : "gradient-bg-light text-txt-color"}`}>
    <div className="max-w-8xl mx-auto">
      {/* Banner */}
      <div className="relative">
        <div className="h-[250px] rounded-t-lg overflow-hidden">
          <img 
            src={currentUser.banner}
            alt="Banner" 
            className="w-full h-full object-cover"
          />
        </div>
        <button className="absolute top-4 right-4 bg-[#26DC5C] shadow-lg p-3 rounded-full" onClick={handleEditProfile}>
          <FaPenToSquare className={`${themeMode === 'theme-mode-dark' ? "text-black" : "text-txt-white"}`} />
        </button>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img 
              src={currentUser.image}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-20 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold ">{currentUser.displayName}</h1>
          <p className="text-gray-500 mt-2">Leading the Way in Our Field and Products</p>
        </div>
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-6">
          <div className={`${themeMode === "theme-mode-dark" ? "bg-[#1F2937]" : "bg-white"} rounded-lg shadow-xl p-6`}>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FaPhone className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className=" font-medium">{currentUser.phone}</p>
              </div>
            </div>
          </div>

          <div className={`${themeMode === "theme-mode-dark" ? "bg-[#1F2937]" : "bg-white"} rounded-lg shadow-xl p-6`}>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FaCertificate className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">License Number</p>
                <p className=" font-medium">{currentUser.licencenum}</p>
              </div>
            </div>
          </div>

          <div className={`${themeMode === "theme-mode-dark" ? "bg-[#1F2937]" : "bg-white"} rounded-lg shadow-xl p-6`}>
            <div className="flex items-center space-x-4">
              <div className="min-w-10 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                < FaEarthAsia className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className=" font-medium">{currentUser.address}</p>
              </div>
            </div>
          </div>

          <div className={`${themeMode === "theme-mode-dark" ? "bg-[#1F2937]" : "bg-white"} rounded-lg shadow-xl p-6`}>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FaLocationDot className="text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pincode</p>
                <p className=" font-medium">{currentUser.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Outlet />
  </div>

  );
};

export default ProfilePage;
