import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      let cart = action.payload;
      let index = state.cartItem.findIndex((item) => item.id === cart.id);
      if (index >= 0) {
        state.cartItem[index].quantity += cart.quantity;
      } else {
        state.cartItem.push(action.payload);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    saveToCart(state, action) {
      state.cartTotalAmount = action.payload.totalCart;
      localStorage.setItem("cartItem", JSON.stringify(action.payload.listCart));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const { saveToCart } = cartSlice.actions;

export default cartSlice.reducer;
