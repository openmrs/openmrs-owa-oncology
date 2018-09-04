import { put, call, select, take, takeLatest } from 'redux-saga/effects';
import concepts from 'concept-mapping';

import request from 'utils/request';

import {
  postEncounterAction,
  postEncounterSuccessAction,
  postEncounterFailureAction,
  postOrderGroupAction,
  postOrderGroupSuccessAction,
  postOrderGroupFailureAction,
  postOrderFailureAction,
} from './actions';

import {
  getHost,
  getHeaders,
} from '../../utils/config';

import {
  makeSelectOrders,
  makeSelectRegimenList,
} from '../OrderPage/selectors';

import {
  makeSelectCurrentProvider,
} from '../Header/selectors';

import {
  makeSelectEncounter,
} from './selectors';

import {
  POST_CHEMO_ORDER,
  POST_CHEMO_ORDER_ERROR,
  POST_ENCOUNTER_SUCCESS,
  POST_ENCOUNTER,
  POST_ORDERGROUP,
  POST_ORDERGROUP_SUCCESS,
} from './constants';

import history from '../../history';

const {
  OGR_CHEMO_PARENT_SET,
  OGR_PREMEDICATION,
  OGR_CHEMOTHERAPY,
  OGR_POSTMEDICATION,
  OGAT_CYCLE_NUMBER,
  OGAT_NUM_CYCLES,
  OGAT_CYCLE_LENGTH,
  OGAT_CYCLE_LENGTH_UNIT,
  OGAT_CYCLE_LENGTH_UNIT_DAY,
  OUTPATIENT_CARE_SETTING,
  ROUTE_IV,
  ROUTE_ORAL,
  MG,
  ML,
  MG_PER_SQ_M,
  NOTES,
} = concepts;

const baseUrl = getHost();
const headers = getHeaders();

function* submitEncounter({ encounter, order }) {
  const requestUrlEncounter = `${baseUrl}/encounter`;

  try {
    const temp = JSON.parse(JSON.stringify(encounter));

    if (order.notes && order.notes.trim().length > 0) {
      temp.obs = [];
      temp.obs.push(
        {
          "concept": NOTES,
          "value": order.notes,
        }
      )
    }

    const encToPost = JSON.stringify(temp);
    console.log(encToPost);

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

function prepOrdersForAPI(medArray, regimen, encounter, currentProvider) {

  return medArray.map(obj => {
    // create a new copy of the object
    const temp = JSON.parse(JSON.stringify(obj));
    const dateActivated = new Date();
    const autoExpireDate = new Date();
    autoExpireDate.setHours(autoExpireDate.getHours() - 2);
    dateActivated.setHours(dateActivated.getHours() - 4);

    // get the uuid of the concept from the regimenList -> orderSetMember corresponding to this order
    regimen.orderSetMembers.forEach(osMember => {
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

function* submitOrderGroup({ encounter, order, regimen, currentProvider }) {
  const requestUrlOrderGroup = `${baseUrl}/ordergroup`;

  try {
    const encounterUuid = encounter.uuid;

    const premedications = [];
    const chemomedications = [];
    const postmedications = [];

    order.medications.forEach((drug)=>{
      switch (drug.category) {
        case "Premedication":
          premedications.push(drug);
          break;
        case "Chemotherapy":
          chemomedications.push(drug);
          break;
        case "Postmedication":
          postmedications.push(drug);
          break;
        default:
          break;
      }
    })

    const filteredPremedications = prepOrdersForAPI(premedications, regimen, encounter, currentProvider) ;
    const filteredChemomedications = prepOrdersForAPI(chemomedications, regimen, encounter, currentProvider);
    const filteredPostmedications = prepOrdersForAPI(postmedications, regimen, encounter, currentProvider);

    // construct the order group
    const orderGroup = {
      orders:[],
      encounter: encounterUuid,
      orderSet: regimen.uuid,
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
          patient: encounter.patient.uuid,
          orders: filteredChemomedications,
        },
        {
          encounter: encounterUuid,
          orderGroupReason: OGR_POSTMEDICATION,
          patient: encounter.patient.uuid,
          orders: filteredPostmedications,
        },
      ],
      attributes: [
        {
          attributeType: OGAT_CYCLE_NUMBER,
          value: '1',     // create the initial cycle
        },
        {
          attributeType: OGAT_NUM_CYCLES,
          value: order.cyclesDescription.cycles.toString(),
        },
        {
          attributeType: OGAT_CYCLE_LENGTH,
          value: order.cyclesDescription.cycleDuration.toString(),
        },
        {
          attributeType: OGAT_CYCLE_LENGTH_UNIT,
          value: OGAT_CYCLE_LENGTH_UNIT_DAY,
        },
      ],
    };

    const orderGroupToPost = JSON.stringify(orderGroup);

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
    const selected = action.orderInfo.orderIndex;
    const order = (yield select(makeSelectOrders()))[selected];

    // create an encounter
    yield put(postEncounterAction(action.orderInfo.encounterObj, order));

    // successfully created encounter
    yield take(POST_ENCOUNTER_SUCCESS);
    const encounter = yield select(makeSelectEncounter());
    const regimen = (yield select(makeSelectRegimenList())).results[action.orderInfo.orderIndex];
    const currentProvider = yield select(makeSelectCurrentProvider());

    // success - created and order group
    yield put(postOrderGroupAction(encounter, order, regimen, currentProvider));

  } catch (error) {
    // failed - no ordergroup created
    yield put(postOrderFailureAction());
  }
}

export function success() {
  history.push(`/physicianDashboard`);
}

export function fail() {
  // TODO: Handle this better
  history.push(`/failed`);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* summary() {
  yield takeLatest(POST_CHEMO_ORDER, postChemoOrder);
  yield takeLatest(POST_ENCOUNTER, submitEncounter);
  yield takeLatest(POST_ORDERGROUP, submitOrderGroup);
  yield takeLatest(POST_ORDERGROUP_SUCCESS, success);
  yield takeLatest(POST_CHEMO_ORDER_ERROR, fail);
}
