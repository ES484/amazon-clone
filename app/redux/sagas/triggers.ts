import {
  takeLatest,
  call,
  put,
  all,
  throttle,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {
  startChangeLangScenario,
  startEnableLoadingScenario,
  startShowToastMessageScenario,
} from './appSaga';
import { appSettingSlice } from '@/redux/slices/appSettingSlice';
import { localeSlice } from '@/redux/slices/localeSlice';



export function* triggerChangeLang() {
  yield takeLatest(`${localeSlice.actions.setLocale}`, startChangeLangScenario);
}

export function* triggerShowToastMessage() {
  yield takeLatest(
    `${appSettingSlice.actions.showToastMessage}`,
    startShowToastMessageScenario
  );
}




