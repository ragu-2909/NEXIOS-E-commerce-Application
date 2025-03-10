"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "./components/Label";
import { Input } from "./components/Input";
import { cn } from "./utils";
import { TypewriterEffect } from "./components/Typewritereffect";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "", // Updated key to match input ID
    DOB: "", // Updated key to match input ID
    MobileNo: "", // Updated key to match input ID
    Adress: "", // Updated key to match input ID
    Pin: "", // Updated key to match input ID
    email: "",
    password: "",
    profileImage: null, // Merged profileImage into formData
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("name", formData.firstname);
    submitData.append("dateofbirth", formData.DOB);
    submitData.append("phoneNo", formData.MobileNo);
    submitData.append("address", formData.Adress);
    submitData.append("pincode", formData.Pin);
    submitData.append("email", formData.email);
    submitData.append("password", formData.password);

    if (formData.profileImage) {
      submitData.append("images", formData.profileImage);
    }

    try {
      const signupResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (signupResponse.data.success) {
        const loginResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/signin`,
          { email: formData.email, password: formData.password }
        );

        if (loginResponse.data.success) {
          localStorage.setItem('token', loginResponse.data.token);
          navigate('/');
          window.location.reload();
        }
      }

      setResponseMessage(signupResponse.data.message);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error submitting the form. Please try again.");
    }
  };

  const words = [
    { text: "Hey", className: "bg-gradient-to-r from-[#121FCF] to-[#CF1512] text-transparent bg-clip-text" },
    { text: "Marian!", className: "bg-gradient-to-r from-[#121FCF] to-[#CF1512] text-transparent bg-clip-text" },
    { text: " Welcome To,", className: "bg-gradient-to-br from-[#f55145] to-[#3d0905] text-transparent bg-clip-text" },
    { text: " NEXIOS", className: "bg-gradient-to-br from-[#f55145] to-[#3d0905] text-transparent bg-clip-text" },
    { text: " ", className: "bg-gradient-to-br from-[#f55145] to-[#3d0905] text-transparent bg-clip-text" },
    { text: " E-Commerce", className: "bg-gradient-to-br from-[#f55145] to-[#3d0905] text-transparent bg-clip-text" },
    { text: " App", className: "bg-gradient-to-br from-[#f55145] to-[#3d0905] text-transparent bg-clip-text" },
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Blur and Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed blur-md brightness-50"
        style={{ backgroundImage: "url('src/assets/planet.jpg')" }}
      ></div>

      {/* Content Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-5">
        <div className="flex flex-col justify-center items-end w-3/4 p-44">
          <TypewriterEffect
            words={words}
            className="text-7xl font-sans text-white"
            cursorClassName="bg-red-500"
          />
        </div>

        <div className="max-w-md w-full mx-auto rounded-md md:rounded-2xl p-2 md:p-8 shadow-input bg-white dark:bg-black/90 mr-10">
          {/* Profile Image Section */}
          <div className="mt-4 flex flex-col items-center">
            {formData.profileImage ? (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No Image
              </div>
            )}
            <label
              htmlFor="profile-upload"
              className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Upload Profile Image
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Sign-Up Form */}
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Tyler" type="text" value={formData.firstname} onChange={handleInputChange} />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={formData.email} onChange={handleInputChange} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="MobileNo">Mobile No</Label>
              <Input id="MobileNo" placeholder="9688545241" type="text" value={formData.MobileNo} onChange={handleInputChange} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="DOB">Date Of Birth</Label>
              <Input id="DOB" placeholder="29-09-2005" type="text" value={formData.DOB} onChange={handleInputChange} />
            </LabelInputContainer>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer className=" w-3/4">
                <Label htmlFor="Adress">Address</Label>
                <Input id="Adress" placeholder="martian" type="address" value={formData.Adress} onChange={handleInputChange} />
              </LabelInputContainer>
              <LabelInputContainer className="w-1/4">
                <Label htmlFor="Pin">PinCode</Label>
                <Input id="Pin" placeholder="MRS121" type="PIN" value={formData.Pin} onChange={handleInputChange} />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleInputChange} />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"

            >
              Sign up &rarr;
              <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
          </form>

          {responseMessage && (
            <div className="mt-4 text-center text-red-500">{responseMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
