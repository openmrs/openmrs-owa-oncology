/*
 *
 * Header actions
 *
 */

import { 
  DEFAULT_ACTION, 
  
  SET_CURRENT_SESSION_LOADING,
  SET_CURRENT_SESSION_SUCCESS,
  SET_CURRENT_SESSION_FAILURE,

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

export function fetchCurrentSessionAction() {
  return {
    type: SET_CURRENT_SESSION_LOADING,
  };
}

export function fetchCurrentSessionSuccessAction(currentSession) {
  return {
    type: SET_CURRENT_SESSION_SUCCESS,
    currentSession,
  };
}

export function fetchCurrentSessionErrorAction(error) {
  return {
    type: SET_CURRENT_SESSION_FAILURE,
    error,
  };
}

export function fetchDefaultEncounterTypeAction() {
  return {
    type: SETTING_ENCOUNTER_TYPE_LOADING,
  };
}

export function fetchDefaultEncounterTypeSuccessAction(configuration) {
  return {
    type: SETTING_ENCOUNTER_TYPE_SUCCESS,
    configuration,
  };
}

export function fetchDefaultEncounterTypeErrorAction(error) {
  return {
    type: SETTING_ENCOUNTER_TYPE_FAILURE,
    error,
  };
}

export function fetchDefaultEncounterRoleAction() {
  return {
    type: SETTING_ENCOUNTER_ROLE_LOADING,
  };
}

export function fetchDefaultEncounterRoleSuccessAction(configuration) {
  return {
    type: SETTING_ENCOUNTER_ROLE_SUCCESS,
    configuration,
  };
}

export function fetchDefaultEncounterRoleErrorAction(error) {
  return {
    type: SETTING_ENCOUNTER_ROLE_FAILURE,
    error,
  };
}

export function fetchEncounterTypeAction() {
  return {
    type: FETCH_ENCOUNTER_TYPE_LOADING,
  };
}

export function fetchEncounterTypeSuccessAction(configuration) {
  return {
    type: FETCH_ENCOUNTER_TYPE_SUCCESS,
    configuration,
  };
}

export function fetchEncounterTypeErrorAction(error) {
  return {
    type: FETCH_ENCOUNTER_TYPE_FAILURE,
    error,
  };
}

export function fetchEncounterRoleAction() {
  return {
    type: FETCH_ENCOUNTER_ROLE_LOADING,
  };
}

export function fetchEncounterRoleSuccessAction(configuration) {
  return {
    type: FETCH_ENCOUNTER_ROLE_SUCCESS,
    configuration,
  };
}

export function fetchEncounterRoleErrorAction(error) {
  return {
    type: FETCH_ENCOUNTER_ROLE_FAILURE,
    error,
  };
}