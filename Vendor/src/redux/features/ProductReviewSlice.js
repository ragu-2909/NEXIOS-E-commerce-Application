import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services/getData";


export const fetchReviews  =  createAsyncThunk('fetchReviews' , async () => {
    try {
        const response = await axios.get(
          `${baseURL}/vendor/productReviews`,
          {
            headers: {
              "Content-Type": "application/json",
              "token" : localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "32",
            },
          }
        )
        return response.data.data;
    } catch (err) {
        console.error(err);
        throw new Error("An error occurred while fetching the product review. Please try again.");
  }})

  const initialState = {
    productReviews : [],
    status: 'idle',
    error: null,
};

const productReviewSlice = createSlice({
  name: "productReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch productReviews
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productReviews = action.payload; // Set the productReviews in the state from backend response
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productReviewSlice.reducer;
