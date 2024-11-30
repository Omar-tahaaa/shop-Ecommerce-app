import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/api_url";

export const fetchProductDetails = createAsyncThunk("singleProduct/fetchProductDetails" , async (id , {rejectWithValue}) => {
try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = res.json()
    return data;
} catch (error) {
    return rejectWithValue(error.message)
}
})


const initialState = {
    productDetails : {},
    singleProductStatus : "idle",
    error : null
}

const productDetailsSlice = createSlice({
    name : "singleProduct",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchProductDetails.pending , (state , action) => {
            state.singleProductStatus = "LOADING"
        })
        .addCase(fetchProductDetails.fulfilled , (state , action) => {
            state.singleProductStatus = "SUCCESSED"
            state.productDetails = action.payload
        })
        .addCase(fetchProductDetails.rejected , (state , action) => {
            state.singleProductStatus = "FAILED"
            state.error = action.payload
        })
    }
})

export default productDetailsSlice.reducer;