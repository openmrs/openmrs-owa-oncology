/*
 *
 * OrderPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_REGIMEN_LIST,
  LOAD_REGIMEN_LIST_SUCCESS,
  LOAD_REGIMEN_LIST_ERROR,
  LOAD_PATIENT,
  LOAD_PATIENT_SUCCESS,
  LOAD_PATIENT_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: {
    regimenList: false,
  },
  error: '',
  regimenList: [],
  order: {},
});

function orderPageReducer(state = initialState, action) {
  switch (action.type) {
    // RegimenList
    case LOAD_REGIMEN_LIST:
      return state.setIn(['loading', 'regimenList'], true);
    case LOAD_REGIMEN_LIST_SUCCESS:
      return state
        .set('regimenList', action.regimenList)
        .set('order', action.regimenList);
    case LOAD_REGIMEN_LIST_ERROR:
      return state.set('error', action.error);
      
    // Patient
    case LOAD_PATIENT:
      return state.setIn(['loading', 'patientUuid'], true);
    case LOAD_PATIENT_SUCCESS:
      return state
        .set('patient', action.patient);
    case LOAD_PATIENT_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default orderPageReducer;
