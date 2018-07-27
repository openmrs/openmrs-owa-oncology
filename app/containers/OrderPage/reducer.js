/*
 *
 * OrderPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  LOAD_REGIMEN_LIST,
  LOAD_REGIMEN_LIST_SUCCESS,
  LOAD_REGIMEN_LIST_ERROR,
  UPDATE_ORDER,
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
  orders: [],
});

function orderPageReducer(state = initialState, action) {
  switch (action.type) {
    // RegimenList
    case LOAD_REGIMEN_LIST:
      return state.setIn(['loading', 'regimenList'], true);
    case LOAD_REGIMEN_LIST_SUCCESS:
      return state
        .set('regimenList', action.regimenList)
        .set('orders', List((action.regimenList.results || []).map(regimen => ({
          notes: '',
          cyclesDescription: {
            cycles: 6,
            cycleDuration: 21,
            days: [1, 8, 15],
          },
          medications: (regimen.orderSetMembers || []).map(order => {
            try {
              return {
                uuid: order.uuid,
                ...JSON.parse(order.orderTemplate),
              }
            } catch (e) {
              return null;
            }
          }),
        }))));
    case LOAD_REGIMEN_LIST_ERROR:
      return state.set('error', action.error);
    case UPDATE_ORDER:
      return state.set(
        'orders',
        state
          .get('orders')
          .update(action.index, () => action.order)
      );

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
