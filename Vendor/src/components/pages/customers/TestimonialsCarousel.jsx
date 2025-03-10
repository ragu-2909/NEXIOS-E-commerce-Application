import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TestimonialCard from '../../Card/TestimonialCard'; 
import { useSelector } from 'react-redux';
import './TestimonialsCarousel.css'; 

const TestimonialsCarousel = () => {
  const productReviews = useSelector((state) => state.productReviews.productReviews);
  const themeMode = useSelector((state) => state.theme.mode);

  const [reviewsData, setReviewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    if (productReviews.length > 0) {
      const transformedReviews = productReviews
        .filter((product) => product.hasReviews)
        .flatMap((product) =>
          product.reviews.map((review) => ({
            imageUrl: review.userpic,
            customerName: review.name,
            productName: product.name,
            rating: review.ratings,
            reviewMessage: review.review,
          }))
        );
      setReviewsData(transformedReviews);
    }
  }, [productReviews]);

  const noReviews = reviewsData.length === 0;

  // Move to the next slide
  const nextSlide = () => {
    if (currentIndex + 3 < reviewsData.length) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
    }
  };

  // Move to the previous slide
  const prevSlide = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
    }
  };

  // Get the next 3 reviews for the carousel
  const getVisibleReviews = () => {
    return reviewsData.slice(currentIndex, currentIndex + 3);
  };

  return (
    <div
      className={`w-full h-full rounded-lg relative overflow-hidden ${
        themeMode === 'theme-mode-dark' ? 'gradient-bg-dark' : 'gradient-bg-light'
      } flex items-center justify-center`}
    >
      {noReviews ? (
        <div className="w-full h-full flex justify-center items-center">
          <p
            className={`text-xl font-bold ${
              themeMode === 'theme-mode-dark' ? 'text-txt-white' : 'text-txt-color'
            }`}
          >
            No product reviews yet
          </p>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-between relative">
            {/* Prev Button */}
            <button
              className={`absolute z-50 left-0 top-1/2 transform -translate-y-1/2 text-xl ${
                themeMode === 'theme-mode-dark' ? 'text-txt-white' : 'text-black'
              }`}
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft />
            </button>

            {/* Carousel Wrapper */}
            <div className="flex transition-transform duration-500 ease-in-out w-full">
              {/* Looping Testimonials Cards with Animation */}
              {getVisibleReviews().map((testimonial, index) => (
                <div
                  key={index}
                  className="w-1/3 p-3 opacity-0 animated-card"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <TestimonialCard
                    imageUrl={testimonial.imageUrl}
                    customerName={testimonial.customerName}
                    productName={testimonial.productName}
                    rating={testimonial.rating}
                    reviewMessage={testimonial.reviewMessage}
                  />
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              className={`absolute z-50 right-0 top-1/2 transform -translate-y-1/2 text-xl ${
                themeMode === 'theme-mode-dark' ? 'text-txt-white' : 'text-black'
              }`}
              onClick={nextSlide}
              disabled={currentIndex + 3 >= reviewsData.length}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
