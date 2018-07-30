import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_REGIMEN_LIST, LOAD_PATIENT} from './constants';
import {
  regimenListLoaded,
  regimenListLoadingError,
  loadPatientSuccess,
  loadPatientError,
} from './actions';

const baseUrl = 'https://humci-azure.pih-emr.org/mirebalais';
const restEndpoint = "/ws/rest/v1"

export function* getRegimenList() {
  const requestURL = `${baseUrl}${restEndpoint}/orderset?v=full`;

  try {
    // Call our request helper (see 'utils/request')
    const regimenList = yield call(request, requestURL, {
      headers: {
        Authorization: `Basic ${btoa('admin:Admin123')}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    yield put(regimenListLoaded(regimenList));
  } catch (err) {
    yield put(regimenListLoadingError(err));
  }
}

export function* loadPatient() {
  const query = new URLSearchParams(window.location.search);
  const patientUuid = query.get('patientId');
  const requestURL = `${baseUrl}${restEndpoint}/patient/${patientUuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`;

  try {
    // Call our request helper (see 'utils/request')
    const patient = yield call(request, requestURL, {
      headers: {
        Authorization: `Basic ${btoa('admin:Admin123')}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
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
