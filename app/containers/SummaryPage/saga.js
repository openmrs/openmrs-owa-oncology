import { put, call, select, takeLatest } from 'redux-saga/effects';
import { POST_CHEMO_ORDER } from 'containers/OrderPage/constants';
import request from 'utils/request';
import {OGR_CHEMO_PARENT_SET, OGR_PREMEDICATION, OGR_CHEMOTHERAPY, OGR_POSTMEDICATION,
  OGAT_CYCLE_NUMBER, OGAT_NUM_CYCLES, OGAT_CYCLE_LENGTH, OGAT_CYCLE_LENGTH_UNIT} from '../../conceptMapping.json';

import {
  // postEncounterFailureAction,
  postEncounterSuccessAction,
  postOrderSuccessAction,
  postOrderFailureAction,
} from '../OrderPage/actions';

import { getHost, getHeaders } from '../../utils/config';
import { makeSelectRegimenList } from '../OrderPage/selectors';
const baseUrl = getHost();
const headers = getHeaders();

export function* postChemoOrder(action) {
  const requestUrlEncounter = `${baseUrl}/encounter`;
  const requestUrlOrderGroup = `${baseUrl}/orderGroup`;

  try {
    const encounterResponse = yield call(request, requestUrlEncounter, {
      headers,
      method: 'POST',
      body: JSON.stringify(action.orderInfo.encounterObj),
    });
    yield put(postEncounterSuccessAction(encounterResponse));

    const regimenList = yield select(makeSelectRegimenList());
    const orderSet = regimenList.results[action.orderInfo.orderIndex].uuid;

    const orderGroup = {
      encounter: encounterResponse.uuid,
      orderSet,
      orderGroupReason: OGR_CHEMO_PARENT_SET,
      nestedOrderGroups: [
        {
          orderGroupReason: OGR_PREMEDICATION,
          orders:[],
        },
        {
          orderGroupReason: OGR_CHEMOTHERAPY,
          orders:[],
        },
        {
          orderGroupReason: OGR_POSTMEDICATION,
          orders:[],
        },     
      ],
      attributes: [
        {
          attributeType: OGAT_CYCLE_NUMBER,
          value:'',
        },
        {
          attributeType: OGAT_NUM_CYCLES,
          value:'',
        },
        {
          attributeType: OGAT_CYCLE_LENGTH,
          value:'',
        },
        {
          attributeType: OGAT_CYCLE_LENGTH_UNIT,
          value: '',
        },
      ],
    };

    const orderGroupResponse = yield call(request, requestUrlOrderGroup, {
      headers,
      method: 'POST',
      body: JSON.stringify(orderGroup),
    });
    yield put(postOrderSuccessAction(orderGroupResponse));

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
