import { take, select, takeLatest, call, put } from 'redux-saga/effects';
import {
  SET_CURRENT_SESSION_LOADING,
  SETTING_ENCOUNTER_TYPE_LOADING,
  SETTING_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_TYPE_LOADING,
  SETTING_ENCOUNTER_ROLE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_SUCCESS,
  LOAD_PATIENT,
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
} from './actions';
import request from '../../utils/request';

import { makeSelectDefaultEncounterType, makeSelectDefaultEncounterRole } from './selectors'

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

export function* fetchEncounters() {
  const requestURL = `${baseUrl}/encounters`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchDefaultEncounterTypeSuccessAction(response));
  } catch (err) {
    yield put(fetchDefaultEncounterTypeErrorAction(err));
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

export function* fetchPatient() {
  const query = new URLSearchParams(window.location.search);
  const patientUuid = query.get('patientId');
  const requestURL = `${baseUrl}/patient/${patientUuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`;

  try {
    // Call our request helper (see 'utils/request')
    const patient = yield call(request, requestURL, {headers});
    yield put(loadPatientSuccess(patient));
  } catch (err) {
    yield put(loadPatientError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SET_CURRENT_SESSION_LOADING, fetchCurrentSession);
  yield takeLatest(SETTING_ENCOUNTER_TYPE_LOADING, fetchDefaultEncounterType);
  yield takeLatest(SETTING_ENCOUNTER_ROLE_LOADING, fetchDefaultEncounterRole);
  yield takeLatest(FETCH_ENCOUNTER_TYPE_LOADING, fetchEncounterType);
  yield takeLatest(FETCH_ENCOUNTER_ROLE_LOADING, fetchEncounterRole);
  yield takeLatest(LOAD_PATIENT, fetchPatient);
}

