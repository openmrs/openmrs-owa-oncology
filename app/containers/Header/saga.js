import { takeLatest, call, put } from 'redux-saga/effects';
import { SET_CURRENT_SESSION} from './constants';
import {
  loadCurrentSessionSuccess,
  loadCurrentSessionError,
} from './actions';
import request from '../../utils/request';

const baseUrl = 'https://humci-azure.pih-emr.org/mirebalais'; 
const restEndpoint = "/ws/rest/v1"

export function* loadCurrentSesion() {
  const requestURL = `${baseUrl}${restEndpoint}/appui/session`;

  try {
    // Call our request helper (see 'utils/request')
    const currentSession = yield call(request, requestURL, {
      headers: {
        Authorization: `Basic ${btoa('admin:Admin123')}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    yield put(loadCurrentSessionSuccess(currentSession));
  } catch (err) {
    yield put(loadCurrentSessionError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SET_CURRENT_SESSION, loadCurrentSesion);
}

