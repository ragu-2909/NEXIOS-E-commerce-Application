import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ErrorPage404 = () => {
  const navigate = useNavigate(); 
  const handlelandingPage = () => {
    navigate("/landingpage")
  }

  const [serverTime, setServerTime] = useState('');
   
  const text = 'PAGE NOT FOUND';
  let i = 0;

  useEffect(() => {
    // Typewriter effect
    const typewriter = document.getElementById('typewriter');
    const typeWriter = () => {
      if (i < text.length) {
        typewriter.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
      }
    };
    typeWriter();

    // Update server time every second
    const updateServerTime = () => {
      const now = new Date();
      setServerTime(now.toLocaleTimeString());
    };

    const timeInterval = setInterval(updateServerTime, 1000);
    updateServerTime(); // Set initial server time

    // Cleanup interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center relative overflow-hidden">
     
      <div className="relative z-10 text-center">
        <h1 className="text-[15rem] font-bold text-[#26DC5C] animate-pulse hover:scale-105 transition-transform duration-500">
          404
        </h1>

        <div className="typewriter mb-8 neon-text">
          <h2 id="typewriter" className="text-3xl text-gray-300 font-[Orbitron]" />
        </div>

        <div className="backdrop-blur-lg bg-gray-900/50 p-8 rounded-lg mb-8 max-w-xl mx-auto border border-custom/30 hover:border-custom/60 transition-all duration-300 hover:transform hover:scale-105">
          <p className="text-gray-400 mb-4">
          Oops! The page you are looking for might have been moved, deleted, doesn't exist, or is temporarily unavailable. Please check the URL for errors or return to the homepage.
          </p>
          <div className="flex gap-4 justify-center items-center">
            {/* Go Back Button */}
            <button
              onClick={() => navigate(-1)} // Navigate to the previous page
              className="!rounded-button bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-3 flex items-center gap-2 transition-all duration-300 border border-custom/30 hover:border-custom hover:scale-110 hover-glow"
            >
              <FaArrowLeft />
              Go Back
            </button>
            {/* Return to Home Button */}
            <button
              href="/"
              className="!rounded-button bg-custom/20 hover:bg-custom/30 text-custom px-6 py-3 flex items-center gap-2 transition-all duration-300 border border-custom hover:scale-110 hover-glow"
              onClick={handlelandingPage}
            >
              <FaHome />
              Return to Base
            </button>
          </div>
        </div>

        <div className="text-gray-600 text-sm">
          <p>
            Error Code: 404 | Server Time: <span>{serverTime}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage404;
