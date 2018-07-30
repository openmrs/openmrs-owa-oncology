import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_REGIMEN_LIST } from './constants';
import {
  regimenListLoaded,
  regimenListLoadingError,
} from './actions';

import { getHost, getHeaders } from '../../utils/config';
const baseUrl = getHost();
const headers = getHeaders();

export function* fetchRegimenList() {
  const requestURL = `${baseUrl}/orderset?v=full`;

  try {
    // Call our request helper (see 'utils/request')
    const regimenList = yield call(request, requestURL, {headers});

    // YUCKINESS: would be better to filter based on a specific UUID
    // const filteredregimenList = regimenList.filter((element) => element.category.some((item) => item.display === "Chemotherapy regimen"));
    // yield put(regimenListLoaded(filteredregimenList));

    yield put(regimenListLoaded(regimenList));
  } catch (err) {
    yield put(regimenListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* order() {
  yield takeLatest(LOAD_REGIMEN_LIST, fetchRegimenList);
}
