import { takeLatest, call, put } from 'redux-saga/effects';
import { 
  SET_CURRENT_SESSION_LOADING,
  SETTING_ENCOUNTER_TYPE_LOADING,
  SETTING_ENCOUNTER_ROLE_LOADING,
} from './constants';
import {
  fetchCurrentSesionSuccess,
  fetchCurrentSesionError,
  fetchEncounterTypeSuccess,
  fetchEncounterTypeError,
  fetchEncounterRoleSuccess,
  fetchEncounterRoleError,
} from './actions';
import request from '../../utils/request';

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

export function* fetchEncounterType() {
  const requestURL = `${baseUrl}${restEndpoint}/systemsetting?v=custom:(value)&q=orderentryowa.encounterType`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchEncounterTypeSuccess(response));
  } catch (err) {
    yield put(fetchEncounterTypeError(err));
  }
}

export function* fetchEnounterRole() {
  const requestURL = `${baseUrl}${restEndpoint}/systemsetting?v=custom:(value)&q=orderentryowa.encounterRole`;

  try {
    const response = yield call(request, requestURL, {headers});
    yield put(fetchEncounterRoleSuccess(response));
  } catch (err) {
    yield put(fetchEncounterRoleError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(SET_CURRENT_SESSION_LOADING, fetchCurrentSesion);
  yield takeLatest(SETTING_ENCOUNTER_TYPE_LOADING, fetchEncounterType);
  yield takeLatest(SETTING_ENCOUNTER_ROLE_LOADING, fetchEnounterRole);
}

