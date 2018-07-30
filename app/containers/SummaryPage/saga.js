import { put, call, takeLatest } from 'redux-saga/effects';
import { POST_CHEMO_ORDER } from 'containers/OrderPage/constants';
import request from 'utils/request';

import {
  postOrderSuccessAction,
  postOrderFailureAction,
} from '../OrderPage/actions';

const baseUrl = 'https://humci-azure.pih-emr.org/mirebalais'; 
const restEndpoint = "/ws/rest/v1"

export function* postChemoOrder(action) {
  const requestURL = `${baseUrl}${restEndpoint}/encounter`;

  try {
    yield call(request, requestURL, {
      headers: {
        Authorization: `Basic ${btoa('admin:Admin123')}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
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
