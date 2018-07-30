import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_REGIMEN_LIST, LOAD_PATIENT} from './constants';
import {
  regimenListLoaded,
  regimenListLoadingError,
  loadPatientSuccess,
  loadPatientError,
} from './actions';

import { getHost, getHeaders } from '../../utils/config';
const baseUrl = getHost();
const headers = getHeaders();

export function* getRegimenList() {
  const requestURL = `${baseUrl}/orderset?v=full`;

  try {
    // Call our request helper (see 'utils/request')
    const regimenList = yield call(request, requestURL, {headers});

    yield put(regimenListLoaded(regimenList));
  } catch (err) {
    yield put(regimenListLoadingError(err));
  }
}

export function* loadPatient() {
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

/**
 * Root saga manages watcher lifecycle
 */
export default function* order() {
  yield takeLatest(LOAD_REGIMEN_LIST, getRegimenList);
  yield takeLatest(LOAD_PATIENT, loadPatient);
}
