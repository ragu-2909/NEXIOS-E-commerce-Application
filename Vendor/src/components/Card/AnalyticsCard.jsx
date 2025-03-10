import React, { useState, useEffect } from "react";
import { FaCartShopping, FaUsers, FaDollarSign, FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";

const AnalyticsCard = () => {
  const orders = useSelector((state) => state.ordersData.orders);
  const themeMode = useSelector((state) => state.theme.mode);

  const [sales, setSales] = useState([]);
  const [customerCount, setCustomerCount] = useState(0); // unique customers count
  const [totalSold, setTotalSold] = useState(0); // total products sold
  const [avgOrderValue, setAvgOrderValue] = useState(0); // average order value
  const productReviews = useSelector((state) => state.productReviews.productReviews);
  
   
  
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
    

    const averageRating = calculateAverageRating(); // Get the average rating

  // Function to calculate total products sold
  const productsSold = () => {
    // console.log("Calculating total products sold...");
    const total = sales.reduce((acc, sale) => acc + sale.quantity, 0);
    // console.log("Total products sold:", total);
    return total;
  };

  // Function to calculate average order value
  const getAvgOrderValue = () => {
    // console.log("Calculating average order value...");
    const totalSalesRevenue = sales.reduce((acc, sale) => acc + sale.saleRevenue, 0);
    const totalSales = sales.length;
    // console.log("Total Sales Revenue:", totalSalesRevenue);
    // console.log("Total Sales Count:", totalSales);
    return totalSales > 0 ? totalSalesRevenue / totalSales : 0;
  };

  // Update the sales data when orders change
  useEffect(() => {
    if (orders && orders.sales) {
      setSales(orders.sales);
      // console.log("Sales data updated:", orders.sales);
    }
  }, [orders]);

  // Update customer count, total products sold, and average order value when sales change
  useEffect(() => {
    if (sales.length > 0) {
      // Calculate unique customers count from sales
      const uniqueCustomerIds = new Set(sales.map((sale) => sale.custId));
      setCustomerCount(uniqueCustomerIds.size);
      // console.log("Unique customer count:", uniqueCustomerIds.size);

      const total = productsSold();
      setTotalSold(total);

      const avgValue = getAvgOrderValue();
      setAvgOrderValue(avgValue); 
      // console.log("Average Order Value:", avgValue);
    }
  }, [sales]);

  // Function to determine font size based on avgOrderValue
  const getTextSize = () => {
    if (avgOrderValue > 10000) {
      return "text-lg font-bold"; // large value, smaller font
    } else if (avgOrderValue > 1000) {
      return "text-2xl font-extrabold"; 
    } else {
      return "text-xl sm:text-2xl font-bold";
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 rounded-lg p-4 sm:p-5 3xl:p-6 shadow-2xl transform transition-all duration-500 grid grid-cols-2 gap-4 overflow-hidden">
      {/* Total Customers Section */}
      <div className="flex flex-col items-start space-y-1 w-full">
        <div className="flex items-center lg:space-x-1 3xl:space-x-2">
          <FaUsers className="text-white text-2xl" /> 
          <span className="text-white text-xs sm:text-[0.8rem]lg:text-sm font-medium">Total Customers</span>
        </div>
        <div className="text-white text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
          {(sales.length !== 0 && customerCount) ? customerCount.toLocaleString("en-IN") : 0}
        </div>
      </div>

      {/* Products Sold Section */}
      <div className="flex flex-col items-start space-y-1 w-full">
        <div className="flex items-center lg:space-x-1 3xl:space-x-2">
          <FaCartShopping className="text-white text-2xl" />
          <span className="text-white text-xs sm:text-[0.8rem]lg:text-sm font-medium">Products Sold</span>
        </div>
        <div className="text-white text-xl sm:text-2xl font-bold">
          {(sales.length !== 0 && totalSold) ? totalSold.toLocaleString("en-IN") : 0}
        </div>
      </div>

      {/* Average Order Value Section */}
      <div className="flex flex-col items-start space-y-1 w-full">
        <div className="flex items-center lg:space-x-1 3xl:space-x-2">
          <FaDollarSign className="text-white text-2xl" />
          <span className="text-white text-xs sm:text-[0.8rem]lg:text-sm font-medium">Avg Order Value</span>
        </div>
        <div className={`text-white ${getTextSize()}`}>
          ₹
          {(sales.length !== 0 && avgOrderValue > 0)
            ? avgOrderValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : 0}
        </div>
      </div>

      {/* Average Rating Section */}
      <div className="flex flex-col items-start space-y-1 w-full">
        <div className="flex items-center lg:space-x-1 3xl:space-x-2">
          <FaStar className="text-white text-2xl" /> 
          <span className="text-white text-xs sm:text-[0.8rem]lg:text-sm font-medium">Avg Rating</span>
        </div>
      <div className="text-white text-xl sm:text-2xl font-bold">{sales.length !== 0 ? `${averageRating}/5` : "0"}</div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
