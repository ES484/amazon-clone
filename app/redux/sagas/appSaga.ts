import { call, put, delay, select, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import route from 'next/router';
import { toast, TypeOptions } from 'react-toastify';
import { lowerCase, snakeCase } from 'lodash';
import { persistor } from '@/redux/store';
import { appSettingSlice } from '../slices/appSettingSlice';

// export function* startResetAppScenario() {
//   yield all([put({ type: `${searchParamsSlice.actions.resetSearchParams}` })]);
//   // persistor.purge();
// }

export function* startResetEnireAppSceanrio() {
  persistor.purge();
}

export function* startEnableLoadingScenario(action: PayloadAction) {
  try {
  } catch (e) {
  } finally {
  }
}

export function* startChangeLangScenario(action: PayloadAction<string>) {
  try {
    i18n.changeLanguage(action.payload);
  } catch (e: any) {
    yield put({
      type: `${appSettingSlice.actions.showToastMessage}`,
      payload: {
        content: e.message,
        type: 'error',
      },
    });
  } finally {
  }
}

export function* startShowToastMessageScenario(
  action: PayloadAction<{
    content: string;
    type: TypeOptions | undefined;
    title?: string;
  }>
) {
  try {
    const content = i18n.t(snakeCase(lowerCase(action.payload.content)));
    toast(content, { type: action.payload.type });
  } catch (e: any) {
    yield put({
      type: `${appSettingSlice.actions.showToastMessage}`,
      payload: {
        content: e.message,
        type: 'error',
      },
    });
  }
}

