import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import hpD from '../../../assets/homepageD.png';
import hpL from '../../../assets/homepageL.png';
import ipD from '../../../assets/inventorypageD.png';
import ipL from '../../../assets/inventorypageL.png';
import dpD from '../../../assets/discountpageD.png';
import dpL from '../../../assets/discountpageL.png';
;
import m1 from '../../../assets/marsbg1.jpg';
import m2 from '../../../assets/marsbg2.jpg';
import bgImg from "../../../assets/marsbg5.jpg"; 
import heroImg from "../../../assets/heroImage.png";
import hyperTradeLogo from "../../../assets/hypertrade logo.svg"

// Feature Carousel Component
const FeatureCarousel = () => {
  const slides = [
    { image: hpD, alt: "homepage Dark" },
    { image: hpL, alt: "homepage Light" },
    { image: ipD, alt: "inventorypage Dark" },
    { image: ipL, alt: "inventorypage Light" },
    { image: dpD, alt: "discountpage Dark" },
    { image: dpL, alt: "discountpage Light" },
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // 5 seconds auto-scroll

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <section className="py-20 relative bg-transparent ">
      <div className="max-w-8xl mx-auto px-6 bg-transparent text-center">
        <h2 className="text-4xl font-bold text-white mb-16">
          Powerful Features for Your <span className="text-orange-500">Martian Business</span>
        </h2>

        <div className="relative bg-transparent flex justify-center">
          <div className="overflow-hidden w-[70%]">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="flex-shrink-0 w-full px-4">
                  <img src={slide.image} alt={slide.alt} className="w-full rounded-lg shadow-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black text-white rounded-full opacity-50 hover:opacity-100 transition"
            onClick={goToPrev}
          >
            &lt;
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black text-white rounded-full opacity-50 hover:opacity-100 transition"
            onClick={goToNext}
          >
            &gt;
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-orange-500' : 'bg-white opacity-50'}`} 
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Carousel Component (similar to FeatureCarousel)
const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "HyperTrade has transformed how we manage our Martian inventory. The platform is intuitive and powerful.",
      name: "John Smith",
      position: "CEO, Mars Tech",
      avatar: m1,
    },
    {
      quote: "The analytics features have given us unprecedented insights into our business performance.",
      name: "Sarah Johnson",
      position: "COO, Red Planet Retail",
      avatar: m2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 relative bg-black bg-opacity-10">
      <div className="max-w-8xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-16">
          Trusted by Leading <span className="text-orange-500">Martian Businesses</span>
        </h2>

        <div className="relative">
          <div className="overflow-hidden w-full">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full px-4">
                  <div className="bg-black bg-opacity-40 backdrop-blur-sm p-8 rounded-lg mx-4">
                    <p className="text-gray-300 mb-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4" 
                      />
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-400">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black text-white rounded-full opacity-50 hover:opacity-100 transition"
            onClick={goToPrev}
          >
            &lt;
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black text-white rounded-full opacity-50 hover:opacity-100 transition"
            onClick={goToNext}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

// Navbar Component
const Navbar = ({ handleSignIn }) => (
  <nav className="fixed w-full z-50 bg-black bg-opacity-40 backdrop-blur-sm">
    <div className="max-w-8xl mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={hyperTradeLogo} alt="hypertrade logo" className='w-8 h-8'/>
          <span className="text-[#26DC5C] text-2xl font-brunoAce font-bold">HYPERTRADE</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-white">
          {/* <Link to={'*'} className='hover:text-custom transition-colors'>About</Link> */}
          <button className="bg-[#26DC5C] text-black font-bold px-6 py-2 rounded-lg" onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </div>
  </nav>
);

// Hero Section Component
const HeroSection = ({ handleSignIn }) => (
  <header className="pt-32 pb-20 relative overflow-hidden">
    <div className="bg-black absolute inset-0 opacity-20 "></div>
    <div className="max-w-8xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12 md:items-start">
        <div className="flex-1 text-center md:text-left">
          <h1 className="md:text-5xl text-4xl text-orange-500 font-bold mb-6">
            Your Hyper-Productive Platform for Martian Business.
          </h1>
          <p className="text-lg text-[#ffffff] font-extrabold mb-8">
            Revolutionizing the way Martian businesses operate with powerful tools and an intuitive interface.
          </p>
          <button className="bg-[#26DC5C] text-black font-semibold px-8 py-3 rounded-lg relative z-10"   onClick={handleSignIn}>
            Get Started
          </button>
        </div>
        <div className="flex-1">
          <img 
            src={heroImg}
            alt="Hero Image"
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </div>
      </div>
    </div>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="bg-black text-white py-8">
    <div className="max-w-8xl mx-auto px-6 text-center">
      <p className="text-lg">© 2024 HyperTrade. All Rights Reserved.</p>
    </div>
  </footer>
);

// Landing Page Component
const LandingPage = () => {
    const navigate = useNavigate()

    const handleSignIn = () => {
        navigate('/signup')
    }

  return (
    <div 
      className="w-full h-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="relative bg-transparent">
        <Navbar handleSignIn={handleSignIn} />
        <HeroSection handleSignIn={handleSignIn} />
        <FeatureCarousel />
        <TestimonialCarousel />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
