import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(` ${action.payload.name} increase by one`, {
          position: "top-left",
        });
      } else {
        const temProduct = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(temProduct);
        toast.success(` ${action.payload.name}Product added to cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(` ${action.payload.name} decrease by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id,
        );
        state.cartItems = newCartItem;
        toast.success(` ${action.payload.name} Removed from Cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id,
      );
      state.cartItems = newCartItem;
      toast.success(` ${action.payload.name} Removed from Cart`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(` Cart Cleared`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_CART_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((acc, curr) => {
        return acc + curr;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_CART_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectedCartItem = (state) => state.cart.cartItems;
export const selectedCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectedCartTotalQuantity = (state) =>
  state.cart.cartTotalQuantity;
export const selectedPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
