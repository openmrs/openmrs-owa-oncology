import { take, select, takeLatest, call, put, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  SET_CURRENT_SESSION_LOADING,
  SETTING_ENCOUNTER_TYPE_LOADING,
  SETTING_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_TYPE_LOADING,
  SETTING_ENCOUNTER_ROLE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_SUCCESS,
  LOAD_PATIENT,
  FETCH_ENCOUNTERS_LOADING,
  CREATE_ENCOUNTER_LOADING,
  FETCH_ORDER_GROUP_LOADING,
  FETCH_ORDER_GROUP_SUCCESS,
  FETCH_OBSERVATIONS_LOADING,
  LOAD_EXTENDED_ORDER_GROUPS,
  CREATE_ORDER_GROUP_LOADING,
} from './constants';
import {
  fetchCurrentSessionSuccessAction,
  fetchCurrentSessionErrorAction,

  fetchDefaultEncounterTypeAction,
  fetchDefaultEncounterTypeSuccessAction,
  fetchDefaultEncounterTypeErrorAction,

  fetchDefaultEncounterRoleAction,
  fetchDefaultEncounterRoleSuccessAction,
  fetchDefaultEncounterRoleErrorAction,

  fetchEncounterTypeSuccessAction,
  fetchEncounterTypeErrorAction,

  fetchEncounterRoleSuccessAction,
  fetchEncounterRoleErrorAction,

  loadPatientError,
  loadPatientSuccess,

  fetchEncountersSuccessAction,
  fetchEncountersErrorAction,

  createEncounterSuccessAction,
  createEncounterErrorAction,
  fetchOrderGroupsErrorAction,
  fetchOrderGroupsSuccessAction,
  fetchOrderGroupsAction,
  fetchObservationsSuccessAction,
  fetchObservationsErrorAction,
  extendedOrderGroupsLoaded,
  extendedOrderGroupsLoadingError,
  createOrderGroupSuccessAction,
  createOrderGroupErrorAction,
  loadExtendedOrderGroups,
} from './actions';
import request from '../../utils/request';

import {
  makeSelectDefaultEncounterType,
  makeSelectDefaultEncounterRole,
  makeSelectParentOrderGroups,
} from './selectors'

import { getHost, getHeaders } from '../../utils/config';
const baseUrl = getHost();
const headers = getHeaders();

export function* fetchCurrentSession() {
  const requestURL = `${baseUrl}/appui/session`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchCurrentSessionSuccessAction(response));
  } catch (err) {
    yield put(fetchCurrentSessionErrorAction(err));
  }
}

export function* fetchDefaultEncounterType() {
  const requestURL = `${baseUrl}/systemsetting?v=custom:(value)&q=orderentryowa.encounterType`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchDefaultEncounterTypeSuccessAction(response));
  } catch (err) {
    yield put(fetchDefaultEncounterTypeErrorAction(err));
  }
}

export function* fetchEncounters({ params }) {
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  const requestURL = `${baseUrl}/encounter?${query}`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchEncountersSuccessAction(response));
  } catch (err) {
    yield put(fetchEncountersErrorAction(err));
  }
}

export function* postEncounter({ encounter }) {
  const requestURL = `${baseUrl}/encounter`;

  try {
    const response = yield call(request, requestURL, {
      headers,
      method: 'POST',
      body: JSON.stringify(encounter),
    });
    yield put(createEncounterSuccessAction(response));
  } catch (err) {
    yield put(createEncounterErrorAction(err));
  }
}

export function* fetchDefaultEncounterRole() {
  const requestURL = `${baseUrl}/systemsetting?v=custom:(value)&q=orderentryowa.encounterRole`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchDefaultEncounterRoleSuccessAction(response));
  } catch (err) {
    yield put(fetchDefaultEncounterRoleErrorAction(err));
  }
}

export function* fetchEncounterType() {

  yield put(fetchDefaultEncounterTypeAction());
  yield take(SETTING_ENCOUNTER_TYPE_SUCCESS);

  const encType = yield select(makeSelectDefaultEncounterType());

  const requestURL = `${baseUrl}/encountertype?q=${encType}`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchEncounterTypeSuccessAction(response));
  } catch (err) {
    yield put(fetchEncounterTypeErrorAction(err));
  }
}

export function* fetchEncounterRole() {

  yield put(fetchDefaultEncounterRoleAction());
  yield take(SETTING_ENCOUNTER_ROLE_SUCCESS);

  const encRole = yield select(makeSelectDefaultEncounterRole());

  const requestURL = `${baseUrl}/encounterrole?q=${encRole}`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchEncounterRoleSuccessAction(response));
  } catch (err) {
    yield put(fetchEncounterRoleErrorAction(err));
  }
}

export function* fetchPatient({ patientUuid }) {
  const requestURL = `${baseUrl}/patient/${patientUuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`;

  try {
    // Call our request helper (see 'utils/request')
    const patient = yield call(request, requestURL, {headers});
    yield put(loadPatientSuccess(patient));
  } catch (err) {
    yield put(loadPatientError(err));
  }
}

export function* fetchOrderGroups({ params }) {
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  const requestURL = `${baseUrl}/ordergroup?${query}`;

  try {
    // Call our request helper (see 'utils/request')
    const patient = yield call(request, requestURL, {headers});
    yield put(fetchOrderGroupsSuccessAction(patient));
  } catch (err) {
    yield put(fetchOrderGroupsErrorAction(err));
  }
}

export function* postOrderGroups({ orderGroup, encounter }) {
  try {
    const encounterResponse = yield call(request, `${baseUrl}/encounter`, {
      headers,
      method: 'POST',
      body: JSON.stringify(encounter),
    });

    const orderGroupBody = {
      ...orderGroup,
      nestedOrderGroups: orderGroup.nestedOrderGroups.map(nestedOrderGroup => ({
        ...nestedOrderGroup,
        encounter: encounterResponse.uuid,
      })),
      encounter: encounterResponse.uuid,
    };

    const response = yield call(request, `${baseUrl}/ordergroup`, {
      headers,
      method: 'POST',
      body: JSON.stringify(orderGroupBody),
    });

    yield put(createOrderGroupSuccessAction(response));
    yield put(loadExtendedOrderGroups(response.patient.uuid));
    yield put(push(`/chemotherapy/${response.uuid}`));
  } catch (err) {
    yield put(createOrderGroupErrorAction(err));
  }
}

export function* getExtendedOrderGroups({ patientUuid }) {
  yield put(fetchOrderGroupsAction({
    patient: patientUuid,
    v: 'full',
  }));
  yield take(FETCH_ORDER_GROUP_SUCCESS);
  const orders = yield select(makeSelectParentOrderGroups());

  try {
    const obs = yield all(orders.map(order => {
      const params = {
        patient: patientUuid,
        order: order.nestedOrderGroups[0].orders[0] && order.nestedOrderGroups[0].orders[0].uuid,
        v: 'full',
      };
      const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
      const requestURL = `${baseUrl}/obs?${query}`;
      return call(request, requestURL, { headers })
    }));

    const encounterUuidsByOrders = {};
    obs.forEach((o, i) => {
      if (o.results.length > 0) {
        encounterUuidsByOrders[orders[i].uuid] = o.results[0].encounter.uuid;
      }
    });

    const encounters = yield all(Object.values(encounterUuidsByOrders).map(uuid => {
      const requestURL = `${baseUrl}/encounter/${uuid}?v=full`;
      return call(request, requestURL, { headers });
    }));

    const extendedOrderGroups = orders.map(order => ({
      ...order,
      treatmentSessionEncounter: encounters
        .find(encounter => encounter.uuid === encounterUuidsByOrders[order.uuid]),
    }));

    yield put(extendedOrderGroupsLoaded(extendedOrderGroups));
  } catch (err) {
    yield put(extendedOrderGroupsLoadingError(err));
  }
}

export function* fetchObservations({ params }) {
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  const requestURL = `${baseUrl}/obs?${query}`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchObservationsSuccessAction(response));
  } catch (err) {
    yield put(fetchObservationsErrorAction(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SET_CURRENT_SESSION_LOADING, fetchCurrentSession);
  yield takeLatest(SETTING_ENCOUNTER_TYPE_LOADING, fetchDefaultEncounterType);
  yield takeLatest(SETTING_ENCOUNTER_ROLE_LOADING, fetchDefaultEncounterRole);
  yield takeLatest(FETCH_ENCOUNTER_TYPE_LOADING, fetchEncounterType);
  yield takeLatest(FETCH_ENCOUNTER_ROLE_LOADING, fetchEncounterRole);
  yield takeLatest(FETCH_ENCOUNTERS_LOADING, fetchEncounters);
  yield takeLatest(LOAD_PATIENT, fetchPatient);
  yield takeLatest(CREATE_ENCOUNTER_LOADING, postEncounter);
  yield takeLatest(FETCH_ORDER_GROUP_LOADING, fetchOrderGroups);
  yield takeLatest(FETCH_OBSERVATIONS_LOADING, fetchObservations);
  yield takeLatest(LOAD_EXTENDED_ORDER_GROUPS, getExtendedOrderGroups);
  yield takeLatest(CREATE_ORDER_GROUP_LOADING, postOrderGroups);
}
