import { put, call, select, take, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import {
  OGR_CHEMO_PARENT_SET, 
  OGR_PREMEDICATION, 
  OGR_CHEMOTHERAPY, 
  OGR_POSTMEDICATION,
  OGAT_CYCLE_NUMBER, 
  OGAT_NUM_CYCLES, 
  OGAT_CYCLE_LENGTH, 
  OGAT_CYCLE_LENGTH_UNIT, 
  OGAT_CYCLE_LENGTH_UNIT_WEEK, 
  OGAT_CYCLE_LENGTH_UNIT_DAY,
} from '../../conceptMapping.json';

import {
  postEncounterAction,
  postEncounterSuccessAction,
  postEncounterFailureAction,
  postOrderGroupAction,
  postOrderGroupSuccessAction,
  postOrderGroupFailureAction,
  postOrderSuccessAction,
  postOrderFailureAction,
} from './actions';

import { 
  getHost, 
  getHeaders,
} from '../../utils/config';

import { 
  makeSelectOrders, 
  makeSelectRegimenList, 
  makeSelectPremedications, 
  makeSelectChemotherapy, 
  makeSelectPostmedications,
} from '../OrderPage/selectors';

import { 
  makeSelectEncounter,
} from './selectors';

import {
  POST_CHEMO_ORDER,
  POST_ENCOUNTER_SUCCESS,
  POST_ENCOUNTER,
  POST_ORDERGROUP,
  POST_ORDERGROUP_SUCCESS,
} from './constants';

const baseUrl = getHost();
const headers = getHeaders();

function* submitEncounter(encounter) {
  const requestUrlEncounter = `${baseUrl}/encounter`;

  try {
    const encToPost = JSON.stringify(encounter.encounter);
  
    const encounterResponse = yield call(request, requestUrlEncounter, {
      headers,
      method: 'POST',
      body: encToPost,
    });
    yield put(postEncounterSuccessAction(encounterResponse));
  } catch(err) {
    console.error(err.toString());
    yield put(postEncounterFailureAction(err));
  }
}

function* submitOrderGroup(action) {
  const requestUrlOrderGroup = `${baseUrl}/orderGroup`;

  try {
    const encounterUuid = action.encounter.uuid;
    const selected = action.action.orderInfo.orderIndex;

    const premedications = (yield select(makeSelectPremedications()))[selected];
    const chemomedications = (yield select(makeSelectChemotherapy()))[selected];
    const postmedications = (yield select(makeSelectPostmedications()))[selected];
    const order = (yield select(makeSelectOrders()))[selected];
    const orderSetUuid = (yield select(makeSelectRegimenList())).results[selected].uuid;

    // construct the order group
    const orderGroup = {
      encounter: encounterUuid,
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
          value: order.cyclesDescription.cycles,
        },
        {
          attributeType: OGAT_CYCLE_LENGTH,
          value: order.cyclesDescription.cycleDuration,
        },
        {
          attributeType: OGAT_CYCLE_LENGTH_UNIT,
          value: OGAT_CYCLE_LENGTH_UNIT_WEEK || OGAT_CYCLE_LENGTH_UNIT_DAY,
        },
      ],
    };  

    // const orderGroupToPost = JSON.stringify(orderGroup);

    const orderGroupResponse = yield call(request, requestUrlOrderGroup, {
      headers,
      method: 'POST',
      body: JSON.stringify(orderGroup),
    });
    yield put(postOrderGroupSuccessAction(orderGroupResponse));
  } catch (err) {
    yield put(postOrderGroupFailureAction(err));
  }
}

export function* postChemoOrder(action) {
  try{
    yield put(postEncounterAction(action.orderInfo.encounterObj));
    yield take(POST_ENCOUNTER_SUCCESS);
    const encounter = yield select(makeSelectEncounter());
    yield put(postOrderGroupAction(action, encounter));
    yield take(POST_ORDERGROUP_SUCCESS);
    yield put(postOrderSuccessAction());    // SUCCESS
  } catch (error) {
    yield put(postOrderFailureAction());    // FAILURE
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* summary() {
  yield takeLatest(POST_CHEMO_ORDER, postChemoOrder);
  yield takeLatest(POST_ENCOUNTER, submitEncounter);
  yield takeLatest(POST_ORDERGROUP, submitOrderGroup);
}
