import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { baseURL } from "../../services/getData";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { fetchVendorInfo } from "../../redux/features/VendorInfoSlice"
const schema = z.object({
  email: z.string().email({ message: "Invalid email address." }),

  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long." })
    .max(25, { message: "Password must be at most 25 characters long." }),
});

const VendorLogin = ({ setVendorInfo }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showPsw, setShowPsw] = useState(false);
  const postData = async (data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    const datajson = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    try {
      const res = await axios.post(`${baseURL}/vendor/signin`, datajson, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = res.data;
      console.log("Success:", result);

      if (result.success && result.token) {
        setVendorInfo(result.data);
        localStorage.setItem("token", result.token);
        localStorage.setItem("vendorName", result.data.name);
        localStorage.setItem("vendorImg", result.data.image);
        console.log("Token saved to localStorage");
        dispatch(fetchVendorInfo())
        console.log("Logged In");
        navigate("/hyperTrade");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 403) {
        console.log(error.response.status);
        console.log("Invalid Email or Password");
        alert("Invalid Email or Password");
      }
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    postData(data);
  };

  return (
    <div className="formcontainer w-[48%] h-[95%] border-[1px] border-transparent rounded-2xl flex flex-col justify-center items-center px-4 pb-6 bg-black bg-opacity-0">
      <div className="w-full h-[100px] pr-2">
        {" "}
        <h1 className="text-white text-[2rem] text-center">Login</h1>{" "}
      </div>
      <form
        className="w-[95%] h-[90%] flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="accountdetailscontainer">
          <div className="accountdetailsheadcontainer flex justify-center">
            <h4 className="accountdetails mb-[1.5rem] text-[1.5rem] text-white">
              Account Details
            </h4>
          </div>

          <div
            id="emailcontainer"
            className="inputcontainer h-[5.5rem] w-[300px] mb-[0.1rem]"
          >
            <label
              className="text-sm font-medium text-white"
              htmlFor="email"
            >
              Email:
            </label>{" "}
            <br />
            <input
              className="w-3/4 h-2/5 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400"
              type="email"
              id="email"
              {...register("email")}
              required
            />
            {errors.email && (
              <div className="errorcontainer text-[0.75rem] text-red-500">
                {errors.email.message}
              </div>
            )}
          </div>

          <div
            id="passwordcontainer"
            className="inputcontainer h-16 w-[300px] mb-[0.1rem]"
          >
            <label
              className="text-sm font-medium text-white"
              htmlFor="password"
            >
              Password:
            </label>{" "}
            <br />
            <div className="flex items-center gap-2">
              <input
                className="w-3/4 h-2/5 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400"
                type={showPsw ? "text " : "password"}
                id="password"
                {...register("password")}
                required
              />
              <button
                className="h-2/5"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPsw((prev) => !prev);
                }}
              >
                {showPsw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <div className="errorcontainer text-[0.75rem] text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>

          <p className="text-white mt-4">
            dont have account ?
            <strong className="text-orange-600 cursor-pointer">
              <Link to="/signup">Signup</Link>
            </strong>
          </p>

          {/* <p className="mt-3 text-white">
            Login as 
            <strong className="text-orange-600 cursor-pointer">
              <Link to="/adminlogin"> Admin</Link>
            </strong>
          </p> */}

          <div className="mt-4 flex justify-between items-center w-full">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VendorLogin;
