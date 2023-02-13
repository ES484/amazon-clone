import { combineReducers } from '@reduxjs/toolkit';
import { localeSlice } from './localeSlice';
import { appSettingSlice } from './appSettingSlice';
import { apiSlice } from '../api';
import { productsApi } from '../api/productApi';
import { cartSlice } from './cartSlice';
import { productSlice } from './productsSlice';

export const rootReducer = combineReducers({
  [localeSlice.name]: localeSlice.reducer,
  [appSettingSlice.name]: appSettingSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [productSlice.name]: productSlice.reducer
});
