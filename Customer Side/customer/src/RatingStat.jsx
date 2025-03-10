import React from "react";

const RatingStatistics = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="font-orbitron text-red-500 text-center p-4 border-2 border-red-500 rounded-lg animate-pulse">
        SYSTEM OFFLINE
      </div>
    );
  }

  const avgRating =
    reviews.reduce((acc, review) => acc + Number(review.ratings), 0) /
    reviews.length;

  const ratingCounts = Array(5).fill(0);
  reviews.forEach((review) => {
    ratingCounts[Number(review.ratings) - 1]++;
  });

  const ratingPercentages = ratingCounts.map(
    (count) => (count / reviews.length) * 100
  );

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-red-400";
    if (rating >= 3) return "text-red-500";
    return "text-red-600";
  };

  return (
    <div className="p-5 bg-transperent rounded-lg border-2 border-red-500/50 shadow-lg shadow-red-500/20 backdrop-blur-sm">
      <div className="text-center mb-6">
       
   
      </div>
      
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Left side - Average Rating */}
        <div className="flex flex-col items-center justify-center w-full md:w-48 p-4 bg-gray-800/50 rounded-lg border border-red-400/30">
     
          <div className={`font-orbitron text-5xl font-bold ${getRatingColor(avgRating)} animate-glow`}>
            {avgRating.toFixed(1)}
          </div>
          <div className="flex items-center mt-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < Math.round(avgRating) ? "#DC2626" : "#1F2937"}
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke={i < Math.round(avgRating) ? "#EF4444" : "#374151"}
                className="w-6 h-6 transform hover:scale-110 transition-transform"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <div className="font-mono text-red-400 mt-4 text-sm tracking-[0.3em]">
            {reviews.length} REVIEWS
          </div>
        </div>

        {/* Right side - Rating Distribution */}
        <div className="flex-1 space-y-2 w-full">
          <div className="font-mono text-red-400/70 text-sm mb-4 tracking-wider">RATING METRICS</div>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center group">
              <div className="w-12 font-orbitron text-red-400 text-sm">
                {rating} ★
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-800 rounded-full h-3 border border-red-500/20">
                  <div
                    className="bg-gradient-to-r from-red-900 to-red-500 h-full rounded-full transition-all duration-500 ease-out group-hover:from-red-700 group-hover:to-red-400"
                    style={{ width: `${ratingPercentages[rating - 1]}%` }}
                  >
                    <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-shine" />
                  </div>
                </div>
              </div>
              <div className="w-20 font-mono text-sm text-red-400 tracking-wider">
                {Math.round(ratingPercentages[rating - 1])}%
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

// Add these styles to your global CSS or Tailwind config
const styles = `
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 10px rgba(220, 38, 38, 0.5), 0 0 20px rgba(220, 38, 38, 0.3); }
    50% { text-shadow: 0 0 20px rgba(220, 38, 38, 0.7), 0 0 30px rgba(220, 38, 38, 0.5); }
  }
  
  @keyframes shine {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .animate-shine {
    animation: shine 2s infinite;
  }
`;

export default RatingStatistics;