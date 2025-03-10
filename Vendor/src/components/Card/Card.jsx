import React from "react";
import {
  FaCircleDollarToSlot,
  FaChartLine,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { BiReceipt, BiSolidUserAccount } from "react-icons/bi";

const Card = ({ cname, cicon, cvalue, cgraph, cdelta }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  return (
    <div
    className={`w-[25%] h-full rounded-2xl shadow-lg p-4 pt-[0.75rem] flex flex-col ${
      themeMode === "theme-mode-dark"
        ? "bg-black text-gray-300"
        : "bg-white text-gray-800"
    }`}
  >
    {/* Header Section with Icon and Name */}
    <div className="flex items-center space-x-3 mb-1">
      <div
        className={`xl:text-[1.05] lg:text-md ${
          themeMode === "theme-mode-dark"
            ? "text-[#26DC5C]"
            : "text-[#26DC5C]"
        }`}
      >
        {cicon}
      </div>
      <p
        className={`xl:text-lg lg:text-[0.85rem] font-semibold ${
          themeMode === "theme-mode-dark"
            ? "text-gray-200"
            : "text-gray-700"
        }`}
      >
        {cname}
      </p>
    </div>
  
    {/* Value and Graph Section */}
    <div className="xl:h-[57.25%] lg:h-[43%] flex justify-between">
      <div className="h-full flex items-center">
        <p
          className={`md:text-[1.2rem] lg:text-[1.55rem] xl:text-[2rem] font-bold ${
            themeMode === "theme-mode-dark"
              ? "text-gray-100"
              : "text-gray-800"
          }`}
        >
          {cvalue}
        </p>
      </div>
  
      <div
        className={`w-[30%] h-full mr-4 mb-4 rounded-lg  flex items-center justify-center`}
      >
        {cgraph}
      </div>
    </div>
  
    {/* Delta Section */}
    <div className="flex items-center space-x-2 mt-1">
      {cdelta < 0 ? (
        <div
          className={`flex items-center gap-2 font-bold ${
            themeMode === "theme-mode-dark"
              ? "text-red-500"
              : "text-red-600"
          }`}
        >
          <div
            className={`rounded-2xl xl:w-6 xl:h-6 lg:w-5 lg:h-5 flex justify-center items-center shadow ${
              themeMode === "theme-mode-dark"
                ? "bg-red-900"
                : "bg-red-100"
            }`}
          >
            <FaArrowTrendDown
              className={`text-md ${
                themeMode === "theme-mode-dark"
                  ? "text-red-500"
                  : "text-red-600"
              }`}
            />
          </div>
          <p className="xl:text-md text-sm">
            {cdelta}%{" "}
            <span
              className={`xl:text-sm text-[0.35rem] font-semibold ${
                themeMode === "theme-mode-dark"
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              last month
            </span>
          </p>
        </div>
      ) : (
        <div
          className={`flex items-center gap-2 font-bold ${
            themeMode === "theme-mode-dark"
              ? "text-[#26DC5C]"
              : "text-[#26DC5C]"
          }`}
        >
          <div
            className={`rounded-2xl xl:w-6 xl:h-6 lg:w-5 lg:h-5 flex justify-center items-center shadow ${
              themeMode === "theme-mode-dark"
                ? "bg-[#77f39c56]"
                : "bg-[#77f39c56]"
            }`}
          >
            <FaArrowTrendUp
              className={`text-md ${
                themeMode === "theme-mode-dark"
                  ? "text-[#26DC5C]"
                  : "text-[#26DC5C]"
              }`}
            />
          </div>
          <p className="xl:text-md text-sm">
            {cdelta}%{" "}
            <span
              className={`xl:text-sm text-[0.35rem] font-semibold ${
                themeMode === "theme-mode-dark"
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              last month
            </span>
          </p>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Card;
