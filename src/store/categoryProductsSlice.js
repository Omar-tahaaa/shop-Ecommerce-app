import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/api_url";

const initialState = {
  categoryProducts: [],
  categoryProductsStatus: "idle",
  error : null,
};

export const fetchCategoryProducts = createAsyncThunk(
  "categoryProducts/fetchCategoryProducts",
  async (category, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/products/category/${category}`);

      const data = await res.json();
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state, action) => {
        state.categoryProductsStatus = "LOADING";
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
        state.categoryProductsStatus = "SUCCESSED";
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.categoryProductsStatus = "FAILED";
      });
  },
});

export default categoryProductsSlice.reducer;
