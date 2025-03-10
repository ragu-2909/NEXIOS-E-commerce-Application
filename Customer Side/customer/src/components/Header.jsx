"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi"; // React Icons for Cart, Account, Search
import { cn } from "../utils";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

export function Header({
  borderRadius = "1.5rem",
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  setdropdownOpen,
  lenOfCart,
  ...otherProps

}) {



  const navigate = useNavigate();

  return (
    <Component
      className={cn(
        "bg-transparent relative text-2xl h-20 z-50 shadow-xl w-11/12 p-[0.3px] overflow-hidden",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-4"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-28 w-screen opacity-[0.8] bg-[radial-gradient(var(--red-600)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative bg-slate-950/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-between  h-full px-6 text-sm antialiased",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {/* Logo */}
        <div className="text-3xl font-bold" onClick={() => {
          navigate("/")
        }}>NEXIOS</div>

        {/* Search Bar */}
        <div className="flex items-center  bg-gray-700 rounded-xl overflow-hidden w-2/5">
          <FiSearch className="text-gray-500 text-2xl ml-3" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-white text-lg px-4 py-2 outline-none"
          />
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <FiShoppingCart
            className="hover:text-sky-500 cursor-pointer text-2xl"
            title="Cart"
            onClick={() => {
              const token = localStorage.getItem('token'); // or however you store your token
              if (token) {
                navigate("/cart");
              } else {
                navigate("/login");
              }
            }}
          />
          <p className="text-white text-xl -translate-x-4">({lenOfCart})</p>

          {localStorage.getItem('token') ? (
            <>
              {/* User Icon */}
              <FiUser
                className="hover:text-sky-500 cursor-pointer text-2xl"
                title="Account"
                onClick={() => navigate("/profile")}
              />

              {/* Logout Icon */}
              <FiLogOut
                className="hover:text-red-500 cursor-pointer text-2xl"
                title="Logout"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
              />
            </>
          ) : (
            // Login Icon
            <FiUser
              className="hover:text-sky-500 cursor-pointer text-2xl"
              title="Login"
              onClick={() => navigate("/login")}
            />
          )}
        </div>

      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 1,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef();
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
