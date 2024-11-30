import { configureStore } from "@reduxjs/toolkit";
import CategoryListReducer from "./categorySlice";
import productsListReducer from "./productsSlice";
import productDetailsReducer from "./productDetailsSlice";
import categoryProductsReducer from "./categoryProductsSlice"
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'
 
export const store = configureStore({
  reducer: {
    category: CategoryListReducer,
    products: productsListReducer,
    singleProduct: productDetailsReducer,
    categoryProducts : categoryProductsReducer,
    cart : cartReducer,
    search : searchReducer,
  },
});
