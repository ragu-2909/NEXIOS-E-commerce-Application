import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Cpu, Lock } from 'lucide-react';
import axios from "axios";

const PaymentOption = ({ Icon, title, description, isSelected, onClick }) => {
  return (
    <div
      className={`bg-black/30 p-4 rounded-lg border-2 transition-all cursor-pointer group 
      ${isSelected ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-red-900/30'}
      hover:border-red-500/70 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-lg bg-red-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="text-red-500" size={24} />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-red-500 font-['Orbitron'] text-lg tracking-wider">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className="ml-auto">
          <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-red-500' : 'bg-red-900'} 
            group-hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all`} />
        </div>
      </div>
    </div>
  );
};

export default function Paygate({ price }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(0);

  // Function to fetch data or perform initialization
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping data fetch.");
      return;
    }

    try {
      // Example: Fetch payment details or other necessary data
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/payment-details`,
        {
          headers: {
            token: token,
            "ngrok-skip-browser-warning": "32",
          },
        }
      );
      console.log("Fetched payment details:", response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  // Use useEffect to trigger fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const postToBackend = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/checkout`,
        {},
        {
          headers: {
            token: token,
            "ngrok-skip-browser-warning": "32",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error?.response?.data || error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-red-500 to-transparent animate-pulse" />
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-red-500 to-transparent animate-pulse" />
      </div>

      <div className="max-w-2xl w-full mx-4 bg-black/80 backdrop-blur-xl rounded-lg p-8 relative border border-red-500/30 
        shadow-[0_0_50px_rgba(239,68,68,0.15)] hover:shadow-[0_0_70px_rgba(239,68,68,0.2)] transition-all duration-500">

        {/* Header Section */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <Shield className="text-red-500 w-8 h-8 animate-pulse" />
            <h1 className="text-2xl font-bold text-red-500 font-orbitron tracking-[0.2em] animate-pulse">
              SECURE PAYMENT
            </h1>
          </div>
          <div className="text-center">
            <div className="inline-block relative">
              <span className="absolute -inset-1 bg-red-500/20 blur-sm rounded-lg"></span>
              <p className="relative text-6xl font-bold text-white font-bebas tracking-wider mb-2">
                ₹{price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4 mb-8">
          <PaymentOption
            Icon={CreditCard}
            title="QUANTUM CARD"
            description="Neural-secured payment network"
            isSelected={selectedOption === 0}
            onClick={() => setSelectedOption(0)}
          />
          <PaymentOption
            Icon={Cpu}
            title="NEURAL PAY"
            description="Direct neural interface payment"
            isSelected={selectedOption === 1}
            onClick={() => setSelectedOption(1)}
          />
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Shield, text: "Quantum Encrypted" },
            { icon: Cpu, text: "AI Protected" },
            { icon: Lock, text: "Neural Secured" }
          ].map((item, index) => (
            <div key={index} className="bg-black/50 border border-red-900/30 p-4 rounded-lg text-center group
              hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all">
              <item.icon className="w-6 h-6 text-red-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-gray-400 text-sm font-orbitron">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Payment Button */}
        <button
          onClick={postToBackend}
          className="w-full bg-gradient-to-r from-red-800 to-red-600 text-white font-['Orbitron'] tracking-wider
            py-4 px-6 rounded-lg relative group overflow-hidden border border-red-500/50
            hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 
            group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">INITIATE PAYMENT</span>
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2">
            <Shield className="w-4 h-4 text-red-500" />
            <span className="text-red-400 text-sm font-['Orbitron']">PROTECTED BY QUANTUM SECURITY PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>

  );
}