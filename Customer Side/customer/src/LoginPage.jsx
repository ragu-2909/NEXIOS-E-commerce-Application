"use client";
import React, { useState } from "react";
import { TypewriterEffect } from "./components/Typewritereffect";
import { motion } from 'framer-motion';
import axios from 'axios';
import { z } from 'zod';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);




  // Login Schema
  const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });
  const nav = useNavigate();

  // Form Validation
  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors = {};
        err.errors.forEach((error) => {
          validationErrors[error.path[0]] = error.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };



  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/signin`,
          { email, password }
        );

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          nav('/');  // Navigate first
          window.location.reload();  // Then reload if needed
        } else {
          setErrors({ form: 'Invalid login credentials' });
        }
      } catch (error) {
        setErrors({ form: 'An error occurred during login. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const words = [
    { text: "Hi!, ", className: "bg-gradient-to-r from-violetStart to-violetEnd text-transparent bg-clip-text" },
    { text: " Welcome To,", className: "bg-gradient-to-r from-violetStart to-violetEnd text-transparent bg-clip-text" },
    { text: " NEXIOS", className: "bg-gradient-to-br from-[#411616] to-[#c2726d] text-transparent bg-clip-text" },
  ];
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-[#411616] via-gray-900 via-40% to-gray-950 flex justify-center items-center">
      <div className="h-5/6 w-5/6 flex justify-between items-center bg-transparent">
        {/* Left Side (Welcome Text) */}
        <div className="flex flex-col justify-center items-end w-3/4 p-7">
          <TypewriterEffect
            words={words}
            className="text-7xl font-sans text-white"
            cursorClassName="bg-red-500"
          />
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex flex-col items-center justify-center w-3/5 h-full bg-gray-800 p-8 rounded-lg space-y-6 shadow-lg">
          <h2 className="text-gray-200 mb-6 text-5xl font-semibold">Login</h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-sm"
          >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-200 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border rounded focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-200 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={visible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full mb-6 p-2 border rounded focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-2 top-2 text-gray-500"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                  >
                    {visible ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}

              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {errors.form && <span className="text-red-500 text-xs">{errors.form}</span>}
            </form>

            <p className="mt-4 text-sm text-gray-400">
              Not registered?{' '}
              <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Sign Up</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
