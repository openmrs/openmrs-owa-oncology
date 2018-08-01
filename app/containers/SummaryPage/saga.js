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
  OUTPATIENT_CARE_SETTING,
  ROUTE_IV,
  ROUTE_ORAL,
  MG,
  ML,
  MG_PER_SQ_M,
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
  // makeSelectOrders, 
  makeSelectRegimenList, 
  makeSelectPremedications, 
  makeSelectChemotherapy, 
  makeSelectPostmedications,
} from '../OrderPage/selectors';

import {
  makeSelectEncounterProvider,
} from '../Header/selectors';

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
    const temp = JSON.parse(JSON.stringify(encounter.encounter));


    // ADD PATIENT NOTES AS OBS TO ENCOUNTER
    // temp.obs = [];
    // temp.obs.push()
    //   {
    //     "concept": "5d1bc5de-6a35-4195-8631-7322941fe528",
    //     "value": 1,
    //   },
    // ],

    const encToPost = JSON.stringify(temp);
  
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

function filterOrders(medArray, orderSetMembers, encounter, currentProvider) {
  return medArray.map(obj => {
    // create a new copy of the object
    const temp = JSON.parse(JSON.stringify(obj));
    const dateActivated = new Date();
    const autoExpireDate = new Date();
    autoExpireDate.setHours(autoExpireDate.getHours() - 2);
    dateActivated.setHours(dateActivated.getHours() - 4);

    // get the uuid of the concept from the regimenList -> orderSetMember corresponding to this order
    orderSetMembers.forEach(osMember => {
      if (osMember.uuid === temp.uuid)
        temp.concept = osMember.concept.uuid
    })

    // map words to uuids in the order
    switch (temp.route) {
      case "Intravenous":
        temp.route = ROUTE_IV;
        break;
      case "Oral":
        temp.route = ROUTE_ORAL;
        break;
      default:
        temp.route = ROUTE_ORAL;
        break;
    }

    switch (temp.doseUnits) {
      case "Milligram per square meter":
        temp.doseUnits = MG_PER_SQ_M;
        break;
      case "Milligram":
        temp.doseUnits = MG;
        break;
      case "Milliliter":
        temp.doseUnits = ML;
        break;
      default:
        temp.doseUnits = ROUTE_ORAL;
        break;
    }

    // add stuff to the order object
    temp.careSetting = OUTPATIENT_CARE_SETTING;
    temp.orderer = currentProvider.uuid;
    temp.patient = encounter.patient.uuid;
    temp.dateActivated = "2018-07-01T08:42:51.229-0000"
    temp.autoExpireDate = "2018-07-01T10:42:51.229-0000"
    temp.dosingType = "org.openmrs.ChemoAdminDosingInstructions";
    temp.dosingInstructions = JSON.stringify(temp.dosingInstructions);

    // remove stuff order object
    delete temp.uuid;
    delete temp.category;
    delete temp.drugConcept;
    delete temp.drugName;
    delete temp.relativeStartDay;
    delete temp.orderTemplateType;

    return temp;
  });
}

function* submitOrderGroup(action) {
  const requestUrlOrderGroup = `${baseUrl}/ordergroup`;

  try {
    const encounterUuid = action.encounter.uuid;
    const selected = action.action.orderInfo.orderIndex;

    const premedications = (yield select(makeSelectPremedications()))[selected];
    const chemomedications = (yield select(makeSelectChemotherapy()))[selected];
    const postmedications = (yield select(makeSelectPostmedications()))[selected];

    // const order = (yield select(makeSelectOrders()))[selected];
    
    const orderSetUuid = (yield select(makeSelectRegimenList())).results[selected].uuid;
    const {orderSetMembers} = (yield select(makeSelectRegimenList())).results[selected];

    const currentProvider = (yield select(makeSelectEncounterProvider()));

    const filteredPremedications = filterOrders(premedications, orderSetMembers, action.encounter, currentProvider);
    const filteredChemomedications = filterOrders(chemomedications, orderSetMembers, action.encounter, currentProvider);
    const filteredPostmedications = filterOrders(postmedications, orderSetMembers, action.encounter, currentProvider);

    // construct the order group
    const orderGroup = {
      orders:[],
      encounter: encounterUuid,
      orderSet: orderSetUuid,
      orderGroupReason: OGR_CHEMO_PARENT_SET,
      nestedOrderGroups: [
        {
          encounter: encounterUuid,
          orderGroupReason: OGR_PREMEDICATION,
          orders: filteredPremedications,
        },
        {
          encounter: encounterUuid,
          orderGroupReason: OGR_CHEMOTHERAPY,
          patient: action.encounter.patient.uuid,
          orders: filteredChemomedications,
        },
        {
          encounter: encounterUuid,
          orderGroupReason: OGR_POSTMEDICATION,
          patient: action.encounter.patient.uuid,
          orders: filteredPostmedications,
        },
      ],
      attributes: [
        {
          attributeType: OGAT_CYCLE_NUMBER,
          value: '1',
        },
        {
          attributeType: OGAT_NUM_CYCLES,
          value: '6',
        },
        {
          attributeType: OGAT_CYCLE_LENGTH,
          value: '28',
        },
        {
          attributeType: OGAT_CYCLE_LENGTH_UNIT,
          value: OGAT_CYCLE_LENGTH_UNIT_WEEK || OGAT_CYCLE_LENGTH_UNIT_DAY,
        },
      ],
    };  

    const orderGroupToPost = JSON.stringify(orderGroup);
    console.log(orderGroupToPost);

    const orderGroupResponse = yield call(request, requestUrlOrderGroup, {
      headers,
      method: 'POST',
      body: orderGroupToPost,
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
