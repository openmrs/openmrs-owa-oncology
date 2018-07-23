import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_REGIMEN_LIST } from 'containers/OrderPage/constants';
import {
  regimenListLoaded,
  regimenListLoadingError,
} from 'containers/OrderPage/actions';
import request from 'utils/request';

const baseUrl = 'https://humci-azure.pih-emr.org/mirebalais';

/**
 * Github repos request/response handler
 */
export function* getRegimenList() {
  const requestURL = `${baseUrl}/ws/rest/v1/orderset?v=full`;

  try {
    // Call our request helper (see 'utils/request')
    const regimenList = yield call(request, requestURL, {
      headers: {
        Authorization: `Basic ${btoa('admin:Admin123')}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
    yield put(regimenListLoaded(regimenList));
  } catch (err) {
    yield put(regimenListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* order() {
  yield takeLatest(LOAD_REGIMEN_LIST, getRegimenList);
}
