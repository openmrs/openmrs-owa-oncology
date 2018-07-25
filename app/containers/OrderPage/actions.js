/*
 *
 * OrderPage actions
 *
 */

import {
  LOAD_REGIMEN_LIST,
  LOAD_REGIMEN_LIST_SUCCESS,
  LOAD_REGIMEN_LIST_ERROR,
  LOAD_PATIENT,
  LOAD_PATIENT_SUCCESS,
  LOAD_PATIENT_ERROR,
} from './constants';

export function loadRegimenList() {
  return {
    type: LOAD_REGIMEN_LIST,
  };
}

export function regimenListLoaded(regimenList) {
  return {
    type: LOAD_REGIMEN_LIST_SUCCESS,
    regimenList,
  };
}

export function regimenListLoadingError(error) {
  return {
    type: LOAD_REGIMEN_LIST_ERROR,
    error,
  };
}


// Load patient from uuid
export function loadPatient(patientUuid) {
  return {
    type: LOAD_PATIENT,
    patientUuid,
  };
}

export function loadPatientSuccess(patient) {
  return {
    type: LOAD_PATIENT_SUCCESS,
    patient,
  };
}

export function loadPatientError(error) {
  return {
    type: LOAD_PATIENT_ERROR,
    error,
  };
}
