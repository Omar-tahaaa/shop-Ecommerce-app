import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/api_url";

const initialState = {
    productsData : [],
    productStatus : "idle",
    error : null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts' , async (limit , {rejectWithValue}) => {
    try {
        const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
        const data = await res.json()
        return data.products;
    } catch (error) {
        return rejectWithValue(error.message)
        
    }
})

 const productsSlice = createSlice({
name: 'products',
initialState,
extraReducers : (builder) => {
    builder.addCase(fetchProducts.pending , (state , action) => {
        state.productStatus = "LOADING"
    })
    .addCase(fetchProducts.fulfilled , (state , action) => {
        state.productsData = action.payload
        state.productStatus = "SUCCESSED"
    })
    .addCase(fetchProducts.rejected , (state , action) => {
        state.productStatus = "FAILED"
        state.error = action.payload
    })
}

})

export default productsSlice.reducer;

