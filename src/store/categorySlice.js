import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/api_url";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategoryList = createAsyncThunk(
  "categoryList/fetchCategoryList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/products/category-list`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categoryList",
  initialState: {
    categoryList: [],
    categoryListStatus: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryList.pending, (state, action) => {
        state.categoryListStatus = "LOADING";
      })
      .addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.categoryListStatus = "SUCCESSED";
        state.categoryList = action.payload;
      })
      .addCase(fetchCategoryList.rejected, (state, action) => {
        state.categoryListStatus = "FAILED";
        state.error = action.payload;
      });
  },
});


export default categorySlice.reducer;
