import React from 'react';

// A simple component to render stars based on rating
const StarRating = ({ rating }) => {
  // Ensure the rating is between 0 and 5 and handle rounding for fractional stars
  const validRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(validRating);  // Number of full stars
  const halfStar = validRating - fullStars >= 0.5 ? true : false;  // Check if a half star is needed
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);  // Remaining empty stars

  // Generate the stars based on the rating
  const stars = [
    ...Array(fullStars).fill('★'),   // Full stars
    ...(halfStar ? ['☆'] : []),      // Half star if needed
    ...Array(emptyStars).fill('☆')   // Empty stars
  ];

  return (
    <div className="star-rating text-[#fdbc09] text-xl">
      {stars.map((star, index) => (
        <span key={index} className={`star ${star === '★' ? 'filled' : star === '☆' ? 'empty' : ''}`}>
          {star}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
