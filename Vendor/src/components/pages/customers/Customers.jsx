import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../../redux/features/ProductReviewSlice";
import { fetchOrders } from "../../../redux/features/OrdersDataSlice";
import StarRating from "../../star/StarRating";
import TestimonialsCarousel from "./TestimonialsCarousel";
import AvgRatings from "./AvgRatings";
import CustomerList from "./CustomerList";
import { fetchQuestions } from "../../../redux/features/ProductQuestionSlice";
import ProductQuestions from "./ProductQuestions";

const Customers = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  
  useEffect(() => {
   dispatch(fetchReviews())
  }, []);

    useEffect(() => {
      dispatch(fetchOrders()); // Dispatch fetchOrders action to get data on mount
    }, []);

    useEffect(() => {
      dispatch(fetchQuestions())
     }, []);
   

  // console.log("productQuestions : ", productQuestions );

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="pageHeader pl-2">Customers</h1>
      <div className="w-full h-[95%] grid grid-cols-9 grid-rows-9 gap-3 mb-2 ">
        <div className="col-span-6 row-span-3  shadow-lg ">
          <TestimonialsCarousel />
        </div>
        <div
          className={`shadow-lg rounded-lg col-span-3 row-span-3 ${
            themeMode === "theme-mode-dark"
              ? "gradient-bg-dark"
              : "gradient-bg-white"
          }`}
        >
          <AvgRatings />
        </div>

        <div className="col-span-6 row-span-6"><CustomerList /></div>
        <div className="col-span-3 row-span-6 rounded-lg"><ProductQuestions /></div>
      </div>
    </div>
  );
};

export default Customers;
