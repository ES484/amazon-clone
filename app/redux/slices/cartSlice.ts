import { Product, Products } from "@/types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sum, sumBy } from "lodash";

const initialState: Products = {
  items: [],
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: typeof initialState, 
      action: PayloadAction<Product>
      ) => {
        const item = state.items?.find((item) => item.id === action.payload.id);
        if(item) {
          item?.quantity && item.quantity++;
        }
        else {
          state.items?.push({ ...action.payload, quantity: 1});
        }
    },
    incrementQuantity: (
      state: typeof initialState, 
      action: PayloadAction<number>
      ) => {
      const item = state.items && state.items.find((item) => item.id === action.payload);
      item?.quantity && item.quantity++;
    },
    decrementQuantity: (
      state: typeof initialState, 
      action: PayloadAction<number>
      ) => {
      const item = state.items && state.items.find((item) => item.id === action.payload);
      if (item?.quantity === 1) {
        item.quantity = 1
      } else {
        item?.quantity && item.quantity--;
      }
    },
    removeFromCart: (
      state: typeof initialState, 
      action: PayloadAction<number>
      ) => {
      const removeItem = state.items && state.items.filter((item) => item.id !== action.payload);
      state.items = removeItem;
    },
    getTotal: (
      state: typeof initialState
      ) => {
        let totalPrice = 0
        state?.items && state?.items.forEach(item => {
          item.subTotal= item.price * (item?.quantity ?? 0)
          
        });
        state.totalPrice = sumBy(state.items, (item) => item?.subTotal ?? 0);
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity,
  getTotal
} = cartSlice.actions;


