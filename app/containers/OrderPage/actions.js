/*
 *
 * OrderPage actions
 *
 */

import {
  LOAD_REGIMEN_LIST,
  LOAD_REGIMEN_LIST_SUCCESS,
  LOAD_REGIMEN_LIST_ERROR,
  UPDATE_ORDER,
  POST_ENCOUNTER_SUCCESS,
  POST_ENCOUNTER_ERROR,
  POST_CHEMO_ORDER_SUCCESS,
  POST_CHEMO_ORDER_ERROR,
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

export function updateOrder(index, order) {
  return {
    type: UPDATE_ORDER,
    index,
    order,
  };
}

export function postEncounterSuccessAction(encounter) {
  return {
    type: POST_ENCOUNTER_SUCCESS,
    encounter,
  };
}

export function postEncounterFailureAction(error) {
  return {
    type: POST_ENCOUNTER_ERROR,
    error,
  };
}

export function postOrderSuccessAction() {
  return {
    type: POST_CHEMO_ORDER_SUCCESS,
  };
}

export function postOrderFailureAction(error) {
  return {
    type: POST_CHEMO_ORDER_ERROR,
    error,
  };
}

