import { put, call, select, takeLatest } from 'redux-saga/effects';
import { POST_CHEMO_ORDER } from 'containers/OrderPage/constants';
import request from 'utils/request';
import {OGR_CHEMO_PARENT_SET, OGR_PREMEDICATION, OGR_CHEMOTHERAPY, OGR_POSTMEDICATION,
  OGAT_CYCLE_NUMBER, OGAT_NUM_CYCLES, OGAT_CYCLE_LENGTH, OGAT_CYCLE_LENGTH_UNIT, OGAT_CYCLE_LENGTH_UNIT_WEEK, OGAT_CYCLE_LENGTH_UNIT_DAY} from '../../conceptMapping.json';

import {
  // postEncounterFailureAction,
  postEncounterSuccessAction,
  postOrderSuccessAction,
  postOrderFailureAction,
} from '../OrderPage/actions';

import { getHost, getHeaders } from '../../utils/config';
import { makeSelectOrders, makeSelectRegimenList, makeSelectPremedications, makeSelectChemotherapy, makeSelectPostmedications} from '../OrderPage/selectors';
const baseUrl = getHost();
const headers = getHeaders();

export function* postChemoOrder(action) {
  const requestUrlEncounter = `${baseUrl}/encounter`;
  const requestUrlOrderGroup = `${baseUrl}/orderGroup`;

  try {
    const selected = action.orderInfo.orderIndex;
    const orderSetUuid = (yield select(makeSelectRegimenList()))[selected].uuid;
    const premedications = (yield select(makeSelectPremedications()))[selected];
    const chemomedications = (yield select(makeSelectChemotherapy()))[selected];
    const postmedications = (yield select(makeSelectPostmedications()))[selected];
    const order = (yield select(makeSelectOrders()))[selected];

    const encounterResponse = yield call(request, requestUrlEncounter, {
      headers,
      method: 'POST',
      body: JSON.stringify(action.orderInfo.encounterObj),
    });
    yield put(postEncounterSuccessAction(encounterResponse));



    const orderGroup = {
      encounter: encounterResponse.uuid,
      orderSet: orderSetUuid,
      orderGroupReason: OGR_CHEMO_PARENT_SET,
      nestedOrderGroups: [
        {
          orderGroupReason: OGR_PREMEDICATION,
          orders: premedications,
        },
        {
          orderGroupReason: OGR_CHEMOTHERAPY,
          orders: chemomedications,
        },
        {
          orderGroupReason: OGR_POSTMEDICATION,
          orders: postmedications,
        },     
      ],
      attributes: [
        {
          attributeType: OGAT_CYCLE_NUMBER,
          value: 1,
        },
        {
          attributeType: OGAT_NUM_CYCLES,
          value: order.cycleDescription.cycles,
        },
        {
          attributeType: OGAT_CYCLE_LENGTH,
          value: order.cycleDescription.cycleDuration,
        },
        {
          attributeType: OGAT_CYCLE_LENGTH_UNIT,
          value: OGAT_CYCLE_LENGTH_UNIT_WEEK || OGAT_CYCLE_LENGTH_UNIT_DAY,
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
