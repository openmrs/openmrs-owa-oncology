import { takeLatest, call, put } from 'redux-saga/effects';
import { LOAD_OBSERVATIONS, CREATE_OBSERVATION } from './constants';

import {
  observationsLoaded,
  observationsLoadingError,
  observationCreated,
  observationCreatingError,
} from './actions';

import request from '../../utils/request';

import { getHost, getHeaders } from '../../utils/config';
const baseUrl = getHost();
const headers = getHeaders();

export function* fetchObservations({ params }) {
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  const requestURL = `${baseUrl}/obs?${query}`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(observationsLoaded(response));
  } catch (err) {
    yield put(observationsLoadingError(err));
  }
}

export function* postObservation(action) {
  const requestURL = `${baseUrl}/obs`;

  try {
    const observation = yield call(request, requestURL, {
      headers,
      method: 'POST',
      body: action.order,
    });
    yield put(observationCreated(observation));
  } catch (err) {
    yield put(observationCreatingError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_OBSERVATIONS, fetchObservations);
  yield takeLatest(CREATE_OBSERVATION, postObservation);
}
