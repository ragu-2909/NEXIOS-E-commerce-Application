import React, { useState, useEffect } from "react";
import marsbg1 from "../../assets/marsbg1.jpg";
import marsbg2 from "../../assets/marsbg2.jpg";
import marsbg3 from "../../assets/marsbg3.jpg";
import marsbg4 from "../../assets/marsbg4.jpg";

const images = [marsbg1, marsbg2, marsbg3, marsbg4];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const changeImage = () => {
    setFadeOut(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFadeOut(false);
    }, 500); // fade out duration in ms
  };

  useEffect(() => {
    const interval = setInterval(changeImage, 8000); // image change evey 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[50%] h-[95%] overflow-hidden relative rounded-xl">
      <div
        className={`w-full h-full bg-cover bg-center transition-opacity duration-[1000ms] ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      />
    </div>
  );
};

export default ImageCarousel;
