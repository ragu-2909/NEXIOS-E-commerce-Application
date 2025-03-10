import React from 'react';
import DonutProgress from "../home/DonutProgress";
import StarRating from '../../star/StarRating';
import { useSelector } from 'react-redux';

const AvgRatings = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const productReviews = useSelector((state) => state.productReviews.productReviews);

  // Function to calculate the frequency of ratings (1-5 stars)
  const getRatingFrequency = () => {
    const ratingFrequency = [0, 0, 0, 0, 0]; // Initialize frequencies for ratings 1, 2, 3, 4, and 5
    
    productReviews.forEach(product => {
      if (product.hasReviews) {
        product.reviews.forEach(review => {
          const rating = review.ratings; // Get the rating for the review
          if (rating >= 1 && rating <= 5) {
            ratingFrequency[rating - 1] += 1; // Increment the count for the corresponding rating
          }
        });
      }
    });

    return ratingFrequency;
  };

  // Function to calculate the average rating
 // Function to calculate the average rating
 const calculateAverageRating = () => {
  let totalRatings = 0;
  let totalReviews = 0;

  productReviews.forEach(product => {
    if (product.hasReviews) {
      product.reviews.forEach(review => {
        // Convert the ratings to a number
        const rating = parseFloat(review.ratings); // or use +review.ratings
        if (!isNaN(rating)) {  // Check if it's a valid number
          totalRatings += rating;  // Add the rating to the total
          totalReviews += 1;        // Increment the review count
        }
      });
    }
  });

  // Return the average rating (rounded to one decimal place)
  return totalReviews > 0 ? (totalRatings / totalReviews).toFixed(1) : 0;
};



  const ratingFrequency = getRatingFrequency(); // Get the frequency of each rating
  const averageRating = calculateAverageRating(); // Get the average rating

  return (
    <div className='w-full h-full flex flex-col p-3'>
      {
        !productReviews || !productReviews.length ? 
        (
          <div className="w-full h-full flex justify-center items-center">
            <p className={`text-xl font-bold ${themeMode === 'theme-mode-dark' ? "text-txt-white" : "text-txt-color"}`}>
              No product reviews yet
            </p>
          </div>
        ) 
        : 
        (
          <>
            <h3 className="text-center text-2xl font-semibold mb-4">Avg. Ratings</h3>
            <div className="w-full h-[70%] pr-8">
              <div className="w-full h-full pr-6 flex justify-around items-center">
                <DonutProgress
                  goal={5}
                  currentValue={averageRating} // Use the calculated average rating here
                  gradientProgressSE={"#0EB6A3"}
                  gradientProgressM={"#0EB6A3"}
                  barColor={"#2D4C33"}
                  uniqueId={1}
                />
                <div className="ml-4">
                  {/* <p className="text-xl font-semibold mb-4">Average Rating: {averageRating} / 5</p> */}
                  {[1,2,3,4,5].map((rating, index) => (
                    <div key={rating} className="flex items-center mb-2">
                      <StarRating rating={rating} />
                      <p className="text-[#fdbc09] ml-2">
                        {ratingFrequency[rating - 1]} {/* Correct index for the frequency */}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default AvgRatings;
