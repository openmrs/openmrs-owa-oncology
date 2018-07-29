import { take, select, takeLatest, call, put } from 'redux-saga/effects';
import { 
  SET_CURRENT_SESSION_LOADING,
  SETTING_ENCOUNTER_TYPE_LOADING,
  SETTING_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_TYPE_LOADING,
  SETTING_ENCOUNTER_ROLE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_SUCCESS,
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
} from './actions';
import request from '../../utils/request';

import { makeSelectEncounterType, makeSelectEncounterRole } from './selectors'

const baseUrl = 'https://humci-azure.pih-emr.org/mirebalais'; 
const restEndpoint = "/ws/rest/v1"
const headers = {
  Authorization: `Basic ${btoa('admin:Admin123')}`,
  'Content-Type': 'application/json;charset=UTF-8',
}

export function* fetchCurrentSession() {
  const requestURL = `${baseUrl}${restEndpoint}/appui/session`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchCurrentSessionSuccessAction(response));
  } catch (err) {
    yield put(fetchCurrentSessionErrorAction(err));
  }
}

export function* fetchDefaultEncounterType() {
  const requestURL = `${baseUrl}${restEndpoint}/systemsetting?v=custom:(value)&q=orderentryowa.encounterType`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchDefaultEncounterTypeSuccessAction(response));
  } catch (err) {
    yield put(fetchDefaultEncounterTypeErrorAction(err));
  }
}

export function* fetchDefaultEncounterRole() {
  const requestURL = `${baseUrl}${restEndpoint}/systemsetting?v=custom:(value)&q=orderentryowa.encounterRole`;

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

  const encType = yield select(makeSelectEncounterType());
  
  const requestURL = `${baseUrl}${restEndpoint}/encountertype?q=${encType}`;

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

  const encRole = yield select(makeSelectEncounterRole());
  
  const requestURL = `${baseUrl}${restEndpoint}/encounterrole?q=${encRole}`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchEncounterRoleSuccessAction(response));
  } catch (err) {
    yield put(fetchEncounterRoleErrorAction(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SET_CURRENT_SESSION_LOADING, fetchCurrentSession);
  yield takeLatest(SETTING_ENCOUNTER_TYPE_LOADING, fetchDefaultEncounterType);
  yield takeLatest(SETTING_ENCOUNTER_ROLE_LOADING, fetchDefaultEncounterRole);
  yield takeLatest(FETCH_ENCOUNTER_TYPE_LOADING, fetchEncounterType);
  yield takeLatest(FETCH_ENCOUNTER_ROLE_LOADING, fetchEncounterRole);
}

