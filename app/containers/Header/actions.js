/*
 *
 * Header actions
 *
 */

import { 
  DEFAULT_ACTION, 
  SET_CURRENT_SESSION_LOADING,
  SET_CURRENT_SESSION_SUCCESS,
  SET_CURRENT_SESSION_ERROR,
  SETTING_ENCOUNTER_ROLE_SUCCESS,
  SETTING_ENCOUNTER_ROLE_FAILURE,
  SETTING_ENCOUNTER_ROLE_LOADING,
  SETTING_ENCOUNTER_TYPE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_FAILURE,
  SETTING_ENCOUNTER_TYPE_LOADING,
  FETCH_ENCOUNTER_TYPE_LOADING,
  FETCH_ENCOUNTER_TYPE_SUCCESS,
  FETCH_ENCOUNTER_TYPE_FAILURE,
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_SUCCESS,
  FETCH_ENCOUNTER_ROLE_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchCurrentSession() {
  return {
    type: SET_CURRENT_SESSION_LOADING,
  };
}

export function fetchCurrentSesionSuccess(currentSession) {
  return {
    type: SET_CURRENT_SESSION_SUCCESS,
    currentSession,
  };
}

export function fetchCurrentSesionError(error) {
  return {
    type: SET_CURRENT_SESSION_ERROR,
    error,
  };
}

export function fetchDefaultEncounterType() {
  return {
    type: SETTING_ENCOUNTER_TYPE_LOADING,
  };
}

export function fetchDefaultEncounterTypeSuccess(configuration) {
  return {
    type: SETTING_ENCOUNTER_TYPE_SUCCESS,
    configuration,
  };
}

export function fetchDefaultEncounterTypeError(error) {
  return {
    type: SETTING_ENCOUNTER_TYPE_FAILURE,
    error,
  };
}

export function fetchDefaultEncounterRole() {
  return {
    type: SETTING_ENCOUNTER_ROLE_LOADING,
  };
}

export function fetchDefaultEncounterRoleSuccess(configuration) {
  return {
    type: SETTING_ENCOUNTER_ROLE_SUCCESS,
    configuration,
  };
}

export function fetchDefaultEncounterRoleError(error) {
  return {
    type: SETTING_ENCOUNTER_ROLE_FAILURE,
    error,
  };
}

export function fetchEncounterType() {
  return {
    type: FETCH_ENCOUNTER_TYPE_LOADING,
  };
}

export function fetchEncounterTypeSuccess(configuration) {
  return {
    type: FETCH_ENCOUNTER_TYPE_SUCCESS,
    configuration,
  };
}

export function fetchEncounterTypeError(error) {
  return {
    type: FETCH_ENCOUNTER_TYPE_FAILURE,
    error,
  };
}

export function fetchEncounterRole() {
  return {
    type: FETCH_ENCOUNTER_ROLE_LOADING,
  };
}

export function fetchEncounterRoleSuccess(configuration) {
  return {
    type: FETCH_ENCOUNTER_ROLE_SUCCESS,
    configuration,
  };
}

export function fetchEncounterRoleError(error) {
  return {
    type: FETCH_ENCOUNTER_ROLE_FAILURE,
    error,
  };
}