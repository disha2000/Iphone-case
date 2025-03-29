import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.carts.push(action.payload);
    },
    updateCart: (state, action) => {
        const { id, quantity} = action.payload;
        const cartItem = state.carts.find((cart) => cart.id === id);
        if (cartItem) {
          cartItem.quantity = quantity;
        }
      },
    removeFromCart: (state, action) => {
      return state.carts.filter((cart) =>  cart.id !== action.payload.id)
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
