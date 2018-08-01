import { takeLatest, call, put } from 'redux-saga/effects';
import { CREATE_OBSERVATION } from './constants';

import {
  observationCreated,
  observationCreatingError,
} from './actions';

import request from '../../utils/request';

import { getHost, getHeaders } from '../../utils/config';
const baseUrl = getHost();
const headers = getHeaders();



export function* postObservation(action) {
  const requestURL = `${baseUrl}/obs`;

  try {
    const observation = yield call(request, requestURL, {
      headers,
      method: 'POST',
      body: JSON.stringify(action.observation),
    });
    yield put(observationCreated(observation));
  } catch (err) {
    yield put(observationCreatingError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(CREATE_OBSERVATION, postObservation);
}
