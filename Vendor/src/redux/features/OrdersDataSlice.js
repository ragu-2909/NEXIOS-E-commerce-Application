import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services/getData";

const initialState = {
  orders: {},
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk("fetchOrders", async () => {
  try {
    const response = await axios.get(`${baseURL}/vendor/salesData`, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "32",
      },
    });
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(
      "An error occurred while fetching the orders. Please try again."
    );
  }
});

export const updateDeliveryStatus = createAsyncThunk('updateDeliveryStatus' , async (orderToUpdate) => {
  try {
      const response = await axios.post(
        `${baseURL}/vendor/updateDeliveryStatus`,
        orderToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token"),
            "ngrok-skip-browser-warning": "32",
          },
        }
      );

  return response.data.data;
      
  } catch (err) {
      console.error(err);
      throw new Error("An error occurred while updating the product. Please try again.");
    }
})

const ordersDataSlice = createSlice({
  name: "ordersData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Set the orders in the state from backend response
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    
     // Update delivery status of orders
     builder
     .addCase(updateDeliveryStatus.pending, (state) => {
       state.status = 'loading';
     })
     .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
       state.status = 'succeeded';
       state.orders = action.payload;  // Directly replace the orders array with the updated one from the backend
     })
     .addCase(updateDeliveryStatus.rejected, (state, action) => {
       state.status = 'failed';
       state.error = action.error.message;
     });
  },
});

export default ordersDataSlice.reducer;



/* 
response.data.data is want we need/get ,
resciveing data will be a object
response.data.data :
  {
    sales : [] array of orders/sales with orderID, product name , quantity etc,
    totalProfits: 96600, calculated from the sales array
    totalRevenue: 696600,calculated from the sales array
    vendorId: "6707990218774ef2420d1201", vendor's id
    __v: 10, not imporant for frontend
    _id: "673b779f7eb82621ffec58e7", not imporant for frontend
  }
 */