import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "../../../redux/features/VendorInfoSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vendorInfo = useSelector((state) => state.vendorInfo.vendorInfo);
  const status = useSelector((state) => state.vendorInfo.status);
  const themeMode = useSelector((state) => state.theme.mode);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    licencenum: "",
    telnum: "",
  });

  const [fieldsToUpdate, setFieldsToUpdate] = useState({
    name: false,
    address: false,
    pincode: false,
    licencenum: false,
    telnum: false,
  });

  const onClose = () => {
    navigate("/hyperTrade/profilepage");
  };

  useEffect(() => {
    if (vendorInfo) {
      setFormData({
        name: vendorInfo.name || "",
        address: vendorInfo.address || "",
        pincode: vendorInfo.pincode || "",
        licencenum: vendorInfo.licencenum || "",
        telnum: vendorInfo.telnum || "",
      });
    }
  }, [vendorInfo]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFieldsToUpdate((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {};

    // Loop through all fields to check if they should be updated
    for (const field in fieldsToUpdate) {
      if (fieldsToUpdate[field]) {
        updatedData[field] = formData[field];
      }
    }

    // Dispatch the update action
    dispatch(editProfile(updatedData));

    if (status === "succeeded") {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed top-0 w-full h-full mt-[65px] bg-stone-950 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-10">
      <div
        className={`rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
          themeMode === "theme-mode-dark"
            ? "bg-black text-txt-white"
            : "gradient-bg-light text-black"
        } p-10 max-w-[50%] w-[25%] mx-auto`}
      >
        <h2 className="text-4xl font-extrabold text-center text-[#4caf50] mb-10 tracking-wide">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Update Name */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="name"
                checked={fieldsToUpdate.name}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update Name</label>
            </div>
            {fieldsToUpdate.name && (
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder={vendorInfo.name}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update Phone */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="telnum"
                checked={fieldsToUpdate.telnum}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update Phone</label>
            </div>
            {fieldsToUpdate.telnum && (
              <input
                type="number"
                name="telnum"
                value={formData.telnum}
                placeholder={vendorInfo.telnum}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update License No. */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="licencenum"
                checked={fieldsToUpdate.licencenum}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update License No.</label>
            </div>
            {fieldsToUpdate.licencenum && (
              <input
                type="text"
                name="licencenum"
                value={formData.licencenum}
                placeholder={vendorInfo.licencenum}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update address */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="address"
                checked={fieldsToUpdate.address}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update address</label>
            </div>
            {fieldsToUpdate.address && (
              <textarea
                name="address"
                value={formData.address}
                placeholder={vendorInfo.address}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Update Pincode */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="pincode"
                checked={fieldsToUpdate.pincode}
                onChange={handleCheckboxChange}
                className="h-6 w-6 bg-[#1a1a1a] border-[#333333] rounded-md checked:bg-[#4caf50]  transition-all duration-300"
              />
              <label className="text-lg font-medium ">Update Pincode</label>
            </div>
            {fieldsToUpdate.pincode && (
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                placeholder={vendorInfo.pincode}
                onChange={handleChange}
                className={`w-full p-4 ${
                  themeMode === "theme-mode-dark"
                    ? "bg-[#1A1A1A] text-white border-[1px] border-gray-700"
                    : "bg-gray-100 text-black shadow-lg border-[1px] border-gray-400"
                }  rounded-lg focus:outline-none  shadow-inner transition-all duration-300`}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              onClick={onClose}
              className={`bg-[#df2b2b] hover:bg-[#e04242] py-3 px-6 rounded-lg ${
                themeMode === "theme-mode-dark"
                  ? "text-black"
                  : "text-txt-white"
              } font-semibold focus:outline-none focus:ring-2 focus:ring-gray-700 shadow-md transition-all duration-300`}
            >
              Close
            </button>
            <button
              type="submit"
              className={`bg-[#4caf50] hover:bg-[#66d96b] py-3 px-6 rounded-lg ${
                themeMode === "theme-mode-dark"
                  ? "text-black"
                  : "text-txt-white"
              } font-semibold focus:outline-none  shadow-md transition-all duration-300`}
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default EditProfile;
