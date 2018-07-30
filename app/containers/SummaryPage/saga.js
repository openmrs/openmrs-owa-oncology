import { put, call, takeLatest } from 'redux-saga/effects';
import { POST_CHEMO_ORDER } from 'containers/OrderPage/constants';
import request from 'utils/request';

import {
  postOrderSuccessAction,
  postOrderFailureAction,
} from '../OrderPage/actions';

import { getHost, getHeaders } from '../../utils/config';
const baseUrl = getHost();
const headers = getHeaders();

export function* postChemoOrder(action) {
  const requestURL = `${baseUrl}/encounter`;

  try {
    yield call(request, requestURL, {
      headers,
      method: 'POST',
      body: action.order,
    });
    yield put(postOrderSuccessAction());
  } catch (err) {
    yield put(postOrderFailureAction(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* summary() {
  yield takeLatest(POST_CHEMO_ORDER, postChemoOrder);
}
