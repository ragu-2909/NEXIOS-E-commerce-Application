import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services/getData";


export const fetchQuestions  =  createAsyncThunk('fetchQuestions' , async () => {
    try {
      // console.log("trying to get questions ")
        const response = await axios.get(
          `${baseURL}/vendor/productQuestions`,
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
        throw new Error("An error occurred while fetching the product questions. Please try again.");
  }})

  export const ansQuestion = createAsyncThunk('ansQuestion', async ({qnA , productId}) => {
    try {
      console.log("qnA : ",qnA)
      console.log("productId : ",productId)
      const response = await axios.post(
        `${baseURL}/vendor/ansQuestion/${productId}`,
        qnA,
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            "ngrok-skip-browser-warning": "32",
          },
        }
      );
      return response.data.data; 
      
    } catch (err) {
      console.error(err);
          throw new Error("An error occurred while answering question . Please try again.");
    }
  });

  const initialState = {
    productQuestions : [],
    status: 'idle',
    error: null,
};

const productQuestionSlice = createSlice({
  name: "productQuestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch productQuestions
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productQuestions = action.payload; // Set the productQuestions in the state from backend response
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    
      builder
      .addCase(ansQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ansQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productQuestions = action.payload;  // Directly replace the productQuestions array with the updated one
  
      })
      .addCase(ansQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productQuestionSlice.reducer;
