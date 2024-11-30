import { createSlice } from "@reduxjs/toolkit";

function storeCartItemSInLocalStorage(cartItem) {
  localStorage.setItem("cart", JSON.stringify(cartItem));
}

export function getCartItemSFromLocalStorage() {
  const foundedCartItem = localStorage.getItem("cart");
  if (foundedCartItem) {
    return JSON.parse(foundedCartItem);
  } else {
    return [];
  }
}

const initialState = {
  cart: getCartItemSFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (isItemInCart) {
        const tempCart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            const tempQty = item.quantity + action.payload.quantity;
            const tempTotalPrice =
              tempQty *
              (item.price - item.price * (item.discountPercentage / 100));
            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice.toFixed(2),
            };
          } else {
            return { ...item };
          }
        });

        state.cart = tempCart;
        storeCartItemSInLocalStorage(state.cart);
      } else {
        state.cart.push(action.payload);
        storeCartItemSInLocalStorage(state.cart);
      }
    },
    removeFromCart: (state, action) => {
      const temprCart = state.cart.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.cart = temprCart;
      storeCartItemSInLocalStorage(state.cart);
    },
    clearCart: (state, action) => {
      state.cart = [];
      storeCartItemSInLocalStorage(state.cart);
    },
    quantityFromCart: (state, action) => {
      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          //Inc
          if (action.payload.type === "INC") {
            const tempQty = item.quantity + 1;
            const tempTotalPrice =
              tempQty *
              (item.price - item.price * (item.discountPercentage / 100));

            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice.toFixed(2),
            };
          } else if (action.payload.type === "DEC") {
            if (item.quantity > 1) {
              const tempQty = item.quantity - 1;
              const tempTotalPrice =
                tempQty *
                (item.price - item.price * (item.discountPercentage / 100));
              return {
                ...item,
                quantity: tempQty,
                totalPrice: tempTotalPrice.toFixed(2),
              };
            } else {
              const tempQty = 1;
              const tempTotalPrice =
                tempQty *
                (item.price - item.price * (item.discountPercentage / 100));
              return {
                ...item,
                quantity: tempQty,
                totalPrice: tempTotalPrice.toFixed(2),
              };
            }
          }else{
            return { ...item };
          }
        } else {
          return { ...item };
        }
      });

      state.cart = tempCart;
      storeCartItemSInLocalStorage(state.cart);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart, quantityFromCart } =
  cartSlice.actions;

// if (action.type === "DEC") {
//   //length > 1
//   if (item.quantity > 1) {
//     const tempQty = item.quantity--;
//     const tempTotalPrice =
//       tempQty *
//       (item.price - item.price * (item.discountPercentage / 100));
//     return {
//       ...item,
//       quantity: tempQty,
//       totalPrice: tempTotalPrice.toFixed(2),
//     };
//   }
// }
