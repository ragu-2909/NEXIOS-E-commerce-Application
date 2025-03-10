import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/ThemeSlice';
import productsDataReducer from './features/ProductsDataSlice';
import selectProductReducer from './features/SelectProductSlice';
import selectDiscountedProductReducer from './features/SelectDiscountedProductSlice';
import logoutModalReducer from './features/LogoutModalSlice';
import ordersDataReducer from './features/OrdersDataSlice';
import vendorInfoReducer from './features/VendorInfoSlice';
import productReviewReducer from './features/ProductReviewSlice';
import productQuestionReducer from './features/ProductQuestionSlice.js'
import appReducer from './features/appSlice'; // Import the app slice for the reset functionality

// Combine all reducers
const rootReducer = combineReducers({
    theme: themeReducer,
    productsData: productsDataReducer,
    selectProduct: selectProductReducer,
    selectDiscountedProduct: selectDiscountedProductReducer,
    logoutModal: logoutModalReducer,
    ordersData: ordersDataReducer,
    vendorInfo: vendorInfoReducer,
    productReviews: productReviewReducer,
    productQuestions: productQuestionReducer,
    app: appReducer, // Add the app reducer for reset
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
