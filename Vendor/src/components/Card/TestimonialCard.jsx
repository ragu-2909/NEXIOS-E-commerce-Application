import React from "react";
import StarRating from "../star/StarRating";
import { useSelector } from "react-redux";

// The TestimonialCard component
const TestimonialCard = ({
  imageUrl,
  customerName,
  productName,
  rating,
  reviewMessage,
}) => {

  const themeMode = useSelector((state) => state.theme.mode);

  const getLimitedReviewMessage = (reviewMessage) => {
    const words = reviewMessage.split(' '); // Split the message into words
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...'; // Limit to 20 words and add "..."
    }
    return reviewMessage; // Return as is if it's less than or equal to 20 words
  };

  return (
    <div
      className={` max-2xl:mt-2 rounded-lg p-4 flex flex-col 
                  ${
                    themeMode === 'theme-mode-dark'
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-gray-900 border-gray-300 shadow-lg'
                  } 
                  min-h-[240px]`}
    >
      <div className="relative">
        {/* Customer Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={imageUrl}
              alt="Customer"
              className="w-12 h-12 mt-3 3xl:mt-0 rounded-full object-cover border-2 border-custom"
            />
          </div>
          <div>
            <h3 className="font-bold text-md">{customerName}</h3>
          </div>
        </div>
        {/* Product and Rating */}
        <div className="mb-4">
          <h4 className="font-semibold text-custom mb-2">{productName}</h4>
          <div className="flex items-center">
            <StarRating rating={rating} />
            <p className="text-[#fdbc09] ml-2">{rating}</p>
          </div>
        </div>
        {/* Review Message */}
        <p className="text-sm leading-relaxed line-clamp-3">
          {getLimitedReviewMessage(reviewMessage)} {/* Apply the word limit here */}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
