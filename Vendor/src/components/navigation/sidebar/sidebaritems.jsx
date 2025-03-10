import { FaHouse  , FaChartPie , FaBox , FaTags , FaUsers ,  FaRegClock , FaGlobe} from "react-icons/fa6";

export const sidebaritems = [
    {
        title : 'Home',
        path : '/hyperTrade/home',
        icon : <FaHouse />,
        element : '<Home/>',
        cname : 'nav-item'
    },
    // {
    //     title : 'Dashboard',
    //     path : '/hyperTrade/dashboard',
    //     icon : <FaChartPie />,
    //     element : '<Dashboard />',
    //     cname : 'nav-item'
    // },
    {
        title : 'Inventory',
        path : '/hyperTrade/inventory',
        icon : <FaBox />,
        element : '<Inventory />',
        cname : 'nav-item'
    },
    {
        title : 'Discounts',
        path : '/hyperTrade/discounts',
        icon : <FaTags />,
        element : '<Discounts />',
        cname : 'nav-item'
    },
    {
        title : 'OrderHistory',
        path : '/hyperTrade/orderhistory',
        icon : <FaRegClock />,
        element : '<OrderHistory />',
        cname : 'nav-item'
    },
    {
        title : 'Customers',
        path : '/hyperTrade/customers',
        icon : <FaUsers />,
        element : '<Customers />',
        cname : 'nav-item'
    },
    // {
    //     title : 'MarketPlace',
    //     path : '/hyperTrade/marketplace',
    //     icon : <FaGlobe />,
    //     element : '<MarketPlace />',
    //     cname : 'nav-item'
    // },
]