import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/features/ProductsDataSlice";
import "./Home.css"
import Stats from "./Stats";
import StatCard from "./StatCard";
import { FaCircleDollarToSlot, FaChartLine } from "react-icons/fa6";
import { BiReceipt, BiSolidUserAccount } from "react-icons/bi";
import bannerImg from "../../../assets/welcomebannerImg.png";
import martianWaving from "../../../assets/martianWaving.png";
import RevProfitChart from "./RevProfitChart";
import Chart2 from "./Chart2";
import Datatables from "../../Tables/Datatables";
import DonutProgress from "./DonutProgress";
import LastestProduct from "./LastestProduct";
import FinancialCard from "../../Card/FinancialCard";
import TopCategoriesChart from "../../Card/TopCategoriesChart";
import LatestOrderHome from "./LastestOrderHome";
import AnalyticsCard from "../../Card/AnalyticsCard";
import { fetchOrders } from "../../../redux/features/OrdersDataSlice";
import { fetchReviews } from "../../../redux/features/ProductReviewSlice";
// import useFetchOrdersPeriodically from "../../../customHooks/useFetchOrdersPeriodically"

let vendorName = "company Name";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsData.products);
  const orders = useSelector((state) => state.ordersData.orders)
  // const status = useSelector((state) => state.productsData.status);
  const themeMode = useSelector((state) => state.theme.mode);
  const [vendorName, setVendorName] = useState(
    localStorage.getItem("vendorName")
  );

  const handleExploreOrders = () => {
    navigate("/hyperTrade/orderhistory");
  };
//  useFetchOrdersPeriodically(30000);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
   // Fetch orders immediately when the app loads (on first render)
   useEffect(() => {
    dispatch(fetchOrders()); // Dispatch fetchOrders action to get data on mount
  }, []);

  useEffect(() => {
     dispatch(fetchReviews())
    }, []);

  const Revenue = 1000;
  const RevenueGoal = 3000;
  const Profit = 0.1 * Revenue;
  const ProfitGoal = 0.2 * Revenue;
  const ProductsSold = 100;
  const ProductsSoldGoal = 300;
  const Customers = 50;
  const CustomersGoal = 100;

  const cardDetails = [
    {
      cname: "Revenue",
      cicon: <FaCircleDollarToSlot />,
      cvalue: Revenue,
      cgoal: RevenueGoal,
      cgradientProgressSE: "#23C288",
      cgradientProgressM: "#33E4A4",
      cbarColor: "#1A7066",
    },
    {
      cname: "Profit",
      cicon: <FaChartLine />,
      cvalue: Profit,
      cgoal: ProfitGoal,
      cgradientProgressSE: "#3384EE",
      cgradientProgressM: "#2B97E4",
      cbarColor: "#13456C",
    },
    {
      cname: "Sold",
      cicon: <BiReceipt />,
      cvalue: ProductsSold,
      cgoal: ProductsSoldGoal,
      cgradientProgressSE: "#BA38F6",
      cgradientProgressM: "#A22EF0",
      cbarColor: "#7118B7",
    },
    {
      cname: "Customers",
      cicon: <BiSolidUserAccount />,
      cvalue: Customers,
      cgoal: CustomersGoal,
      cgradientProgressSE: "#EC1D1D",
      cgradientProgressM: "#D91717",
      cbarColor: "#421B1B",
    },
  ];

  // const salesByProducts = [
  //   { name: "Product A", value: 400 },
  //   { name: "Product B", value: 300 },
  //   { name: "Product C", value: 200 },
  //   { name: "Product D", value: 100 },
  //   { name: "Product E", value: 150 },
  //   { name: "Product F", value: 250 },
  //   { name: "Product G", value: 450 },
  //   { name: "Product H", value: 300 },
  //   { name: "Product I", value: 180 },
  //   { name: "Product J", value: 50 },
  // ];

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="pageHeader pl-2">Home</h1>
   
      <div className="w-full h-[95%] grid grid-cols-9 grid-rows-11 gap-3 ">
        <div className="col-span-4 row-span-3  rounded-lg">
          <div
            className="w-full h-full  rounded-lg"
            style={{
              backgroundImage: `url(${bannerImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full h-full rounded-lg banner-bg-gradient flex justify-between">
              <div className="h-full flex flex-col gap-[0.175rem] 3xl:gap-2 w-full sm:w-[70%] p-3 3xl:p-4">
                <h2 className="welcomeText font-semibold text-[#26DC5C]">
                  Welcome Back
                </h2>
                <span className=" companyNameText font-semibold text-txt-white">
                  {vendorName || "company Name"}
                </span>
                <p className="companyDescText w-full sm:w-[80%] font-semibold text-[#AFAFAF]">
                  We’re thrilled to see you again. Your store’s growth matters
                  to us, and we’re here to help. Take a look at the latest
                  insights, manage your inventory, and keep your sales growing!
                </p>
                <button
                  className="exploreBtn lg:w-[140px] rounded-md text-sm bg-[#DA653A] p-1 text-black font-semibold mt-1"
                  onClick={handleExploreOrders}
                >
                  Explore Orders
                </button>
              </div>
              <div className="astroContainer h-full w-[30%] sm:w-[18%]">
                <img
                  src={martianWaving}
                  alt="Martian waving , greeting welcome back vendor"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 row-span-3">
          <FinancialCard />
        </div>
        <div className="col-span-2 row-span-3">
          <AnalyticsCard />
        </div>

        <div className={`col-span-7 row-span-3 rounded-lg ${themeMode === 'theme-mode-dark' ? "bg-black" : "gradient-bg-light"}`}>
          {
            (!products.length || !orders || !orders.sales || !orders.sales.length) ? 
            ( <div className="w-full h-full mb-8 flex justify-center items-center"><p className={`text-xl font-bold ${themeMode === 'theme-mode-dark' ? "text-txt-white" : "text-txt-color"}`}>No sales to track at the moment. Revenue and profit data will update once orders are received</p></div>) 
            : <Chart2 />
          }
          
        </div>
        {/*"bg-gradient-to-br from-purple-900 via-rose-900 to-purple-900" was before color of below div */}
        <div
          className={`col-span-2 row-span-8 rounded-lg ${
            themeMode === "theme-mode-dark"
              ? "gradient-bg-dark"
              : "gradient-bg-light"
          }`}
        >
          <TopCategoriesChart />
        </div>
        <div className="col-span-3 row-span-5">
          <LastestProduct products={products} />
        </div>
        <div className="col-span-4 row-span-5">
          <LatestOrderHome />
        </div>
      </div>
    </div>
  );
};

export default Home;
