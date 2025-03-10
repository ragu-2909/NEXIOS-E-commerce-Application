import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../services/getData";

const initialState = {
  vendorInfo: {},
  status: "idle",
  error: null,
};

export const fetchVendorInfo = createAsyncThunk("fetchVendorInfo", async () => {
  try {
    const response = await axios.get(`${baseURL}/vendor/profile`, {
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
      "An error occurred while fetching the vendor profile. Please try again."
    );
  }
});

export const editProfile = createAsyncThunk(
  "editProfile",
  async (editedProfileDetails) => {
    try {
      const response = await axios.patch(
        `${baseURL}/vendor/update-profile`,
        editedProfileDetails,
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
      throw new Error(
        "An error occurred while editing the profile. Please try again."
      );
    }
  }
);

const vendorInfoSlice = createSlice({
  name: "vendorInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch vendorInfo
    builder
      .addCase(fetchVendorInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendorInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendorInfo = action.payload; // Set the vendorInfo in the state from backend response
      })
      .addCase(fetchVendorInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Edit Profile
    builder
      .addCase(editProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vendorInfo = action.payload; // Directly replace the vendor info obj with the updated one from the backend
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default vendorInfoSlice.reducer;
