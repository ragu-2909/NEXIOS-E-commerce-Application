import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services/getData";



export const fetchProducts  =  createAsyncThunk('fetchProducts' , async () => {
    try {
        const response = await axios.get(
          `${baseURL}/vendor/products`,
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
        throw new Error("An error occurred while fetching the products. Please try again.");
  }})

export const addProduct = createAsyncThunk('addProduct' , async (newProduct) => {
    try {
        const response = await axios.post(`${baseURL}/vendor/addproduct`, newProduct , {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token' : localStorage.getItem('token'),
            "ngrok-skip-browser-warning": "32",
          },
        });
    
        return response.data.data;

        } catch (err) {
        console.error(err);
        throw new Error('An error occurred while adding the product. Please try again.');
      }
})

export const deleteProduct = createAsyncThunk('deleteProduct' , async (productID) => {
    try {
        const response = await axios.delete(
          `${baseURL}/vendor/delete-product/${productID}`,
          {
            headers: {
              "Content-Type": "application/json",
              "token": localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "32",
            },
          }
        );

        return response.data.data || productID ;
  
      } catch (err) {
        console.error(err);
        throw new Error("An error occurred while deleting the product. Please try again.");
      }
})

export const updateProduct = createAsyncThunk('updateProduct' , async ({ productID,updatedProduct }) => {
    try {
        const response = await axios.patch(
          `${baseURL}/vendor/update-details/${productID}`,
          updatedProduct,
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

export const editProductStock = createAsyncThunk('editProductStock' , async ({ productID,editedProductStock }) => {
    try {
        const response = await axios.patch(
          `${baseURL}/vendor/update-stock/${productID}`,
          editedProductStock,
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
        throw new Error("An error occurred while editing the stock. Please try again.");
      }
})
export const applyDiscount = createAsyncThunk('applyDiscount', async (discData) => {
  try {
    const response = await axios.post(
      `${baseURL}/vendor/applyDiscount`,
      discData,
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
        throw new Error("An error occurred while applying discount . Please try again.");
  }
});

const initialState = {
    products : [],
    status: 'idle',
    error: null,
};

const productsDataSlice = createSlice({
    name: 'productsData',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
      // Fetch Products
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload; // Set the products in the state from backend response
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
  
      // Add Product
      builder
        .addCase(addProduct.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;  // Replace the products array with the updated list
        })
        .addCase(addProduct.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
  
      // Delete Product
      builder
        .addCase(deleteProduct.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;  // Directly set the products array from backend response (updated list)
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
  
      // Update Product
      builder
        .addCase(updateProduct.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;  // Directly replace the products array with the updated one from the backend
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
  
      // Edit Product Stock
      builder
        .addCase(editProductStock.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(editProductStock.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;  // Directly replace the products array with the updated one
        })
        .addCase(editProductStock.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
      // Add Discount
    builder
    .addCase(applyDiscount.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(applyDiscount.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;  // Directly replace the products array with the updated one

    })
    .addCase(applyDiscount.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    },
  });

  export default productsDataSlice.reducer;