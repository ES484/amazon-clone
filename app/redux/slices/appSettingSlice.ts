import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appSetting } from '@/types/index';

const initialState: appSetting = {
  toastMessage: {
    title: ``,
    content: ``,
    showToast: false,
    type: `default`,
  }
};

export const appSettingSlice = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    setUrl: (state: typeof initialState, action: PayloadAction<string>) => {
      return {
        ...state,
        url: action.payload,
      };
    },
    showToastMessage: (
      state: typeof initialState,
      action: PayloadAction<{
        content: string;
        type: string;
        title?: string;
      }>
    ) => {
      return {
        ...state,
        toastMessage: {
          content: action.payload.content,
          showToast: true,
          type: `info`,
          title: action.payload.title ?? ``,
        },
      };
    },
    hideToastMessage: (state: typeof initialState, action: PayloadAction) => {
      return {
        ...state,
        toastMessage: {
          title: ``,
          content: ``,
          type: `info`,
          showToast: false,
        },
      };
    },
    resetAppSetting: (state: typeof initialState, action: PayloadAction) => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setUrl,
  showToastMessage,
  hideToastMessage,
  resetAppSetting
} = appSettingSlice.actions;
