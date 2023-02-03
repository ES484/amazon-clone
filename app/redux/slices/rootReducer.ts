import { combineReducers } from '@reduxjs/toolkit';
import { localeSlice } from './localeSlice';
import { appSettingSlice } from './appSettingSlice';

export const rootReducer = combineReducers({
  [localeSlice.name]: localeSlice.reducer,
  [appSettingSlice.name]: appSettingSlice.reducer,
});
