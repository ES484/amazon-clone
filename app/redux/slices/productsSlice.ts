import { Products, Product } from "@/types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sum, sumBy } from "lodash";

const initialState: Products = {
  data: [], 
  filteredProducts: [] 
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (
      state: typeof initialState, 
      action: PayloadAction<Product[]>
      ) => {
        state.data = action.payload
    },
    setFilteredProducts: (
        state: typeof initialState, 
        action: PayloadAction<Product[]>
        ) => {
          state.filteredProducts = action.payload
      }
  },
});

export const { 
 setProducts,
 setFilteredProducts
} = productSlice.actions;


