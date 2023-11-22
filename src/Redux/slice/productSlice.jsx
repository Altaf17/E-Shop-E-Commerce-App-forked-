import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload.products;
    },
    GET_PRICE_RANGE: (state, action) => {
      const { products } = action.payload;
      let temArray = [];
      products.map((pro) => {
        const price = pro.price;
        return temArray.push(price);
      });
      const max = Math.max(...temArray);
      const min = Math.min(...temArray);
      state.maxPrice = max;
      state.minPrice = min;
    }
  }
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
