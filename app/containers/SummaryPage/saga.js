import { call, takeLatest } from 'redux-saga/effects';
import { POST_CHEMO_ORDER } from 'containers/OrderPage/constants';
import request from 'utils/request';

const baseUrl = 'https://humci-azure.pih-emr.org/mirebalais'; 
const restEndpoint = "/ws/rest/v1"

export function* postChemoOrder(orderIndex) {
  const requestURL = `${baseUrl}${restEndpoint}/encounter`;
  console.log(orderIndex);

  try {
    // Call our request helper (see 'utils/request')
    const session = yield call(request, requestURL, {
      headers: {
        Authorization: `Basic ${btoa('admin:Admin123')}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: {
        encounterProviders: [{
          encounterRole: this.props.encounterRole.uuid,
          provider: this.props.sessionReducer.currentProvider.uuid,
        }],
        encounterType: this.props.encounterType.uuid,
        location: this.props.sessionReducer.currentLocation,
        orders: this.state.orders,
        patient: this.props.patient.uuid,
      },
    });
    console.log(session);
    // yield put(regimenListLoaded(regimenList));
  } catch (err) {
    // yield put(regimenListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* order() {
  yield takeLatest(POST_CHEMO_ORDER, postChemoOrder);
}
