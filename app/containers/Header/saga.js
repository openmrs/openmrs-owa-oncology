import { takeLatest, call, put } from 'redux-saga/effects';
import { 
  SET_CURRENT_SESSION_LOADING,
  SETTING_ENCOUNTER_TYPE_LOADING,
  SETTING_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_TYPE_LOADING,
  // SETTING_ENCOUNTER_ROLE_SUCCESS,
  // SETTING_ENCOUNTER_TYPE_SUCCESS,
} from './constants';
import {
  fetchCurrentSesionSuccess,
  fetchCurrentSesionError,
  fetchDefaultEncounterTypeSuccess,
  fetchDefaultEncounterTypeError,
  fetchDefaultEncounterRoleSuccess,
  fetchDefaultEncounterRoleError,
  fetchEncounterTypeSuccess,
  fetchEncounterTypeError,
  fetchEncounterRoleSuccess,
  fetchEncounterRoleError,
} from './actions';
import request from '../../utils/request';

// import {makeSelectEncounterType} from './selectors'

const baseUrl = 'https://humci-azure.pih-emr.org/mirebalais'; 
const restEndpoint = "/ws/rest/v1"
const headers = {
  Authorization: `Basic ${btoa('admin:Admin123')}`,
  'Content-Type': 'application/json;charset=UTF-8',
}

export function* fetchCurrentSesion() {
  const requestURL = `${baseUrl}${restEndpoint}/appui/session`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchCurrentSesionSuccess(response));
  } catch (err) {
    yield put(fetchCurrentSesionError(err));
  }
}

export function* fetchDefaultEncounterType() {
  const requestURL = `${baseUrl}${restEndpoint}/systemsetting?v=custom:(value)&q=orderentryowa.encounterType`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchDefaultEncounterTypeSuccess(response));
  } catch (err) {
    yield put(fetchDefaultEncounterTypeError(err));
  }
}

export function* fetchDefaultEncounterRole() {
  const requestURL = `${baseUrl}${restEndpoint}/systemsetting?v=custom:(value)&q=orderentryowa.encounterRole`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchDefaultEncounterRoleSuccess(response));
  } catch (err) {
    yield put(fetchDefaultEncounterRoleError(err));
  }
}

export function* fetchEncounterType() {

  yield* fetchDefaultEncounterType();

  // const obj = makeSelectEncounterType();

  const requestURL = `${baseUrl}${restEndpoint}/encountertype?q={value}`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchEncounterRoleSuccess(response));
  } catch (err) {
    yield put(fetchEncounterRoleError(err));
  }

}

export function* fetchEncounterRole() {
  const requestURL = `${baseUrl}${restEndpoint}/encounterrole?q={value}`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchEncounterTypeSuccess(response));
  } catch (err) {
    yield put(fetchEncounterTypeError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SET_CURRENT_SESSION_LOADING, fetchCurrentSesion);
  yield takeLatest(SETTING_ENCOUNTER_TYPE_LOADING, fetchDefaultEncounterType);
  yield takeLatest(SETTING_ENCOUNTER_ROLE_LOADING, fetchDefaultEncounterRole);
  yield takeLatest(FETCH_ENCOUNTER_TYPE_LOADING, fetchEncounterType);
  yield takeLatest(FETCH_ENCOUNTER_ROLE_LOADING, fetchEncounterRole);
}

