import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/api_url";


export const fetchSearchProducts = createAsyncThunk("search/fetchSearchProducts" , async (searchValue , {rejectWithValue}) => {
try {
    const res = await fetch(`${BASE_URL}/products/search?q=${searchValue}`)
    const data = await res.json()
    return data.products
} catch (error) {
    return rejectWithValue(error.message);
}
})

const initialState = {
    searchProducts : [],
    fetchSearchProductsStatus : "idle",
    error : null
}

const searchSlice = createSlice({
    name : "search",
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchSearchProducts.pending , (state , action) => {
            state.fetchSearchProductsStatus = "LOADING"
        })
        .addCase(fetchSearchProducts.fulfilled , (state , action) => {
            state.fetchSearchProductsStatus = "SUCCESSED"
            state.searchProducts = action.payload
        })
        .addCase(fetchSearchProducts.rejected, (state , action) => {
            state.fetchSearchProductsStatus = "FAILED"
            state.error = action.payload
        })
    }

})

export default searchSlice.reducer