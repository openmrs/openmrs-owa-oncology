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
    case LOAD_REGIMEN_LIST:
      return state.setIn(['loading', 'regimenList'], true);
    case LOAD_REGIMEN_LIST_SUCCESS:
      return state
        .set('regimenList', action.regimenList)
        .set('orders', List((action.regimenList.results || []).map(regimen =>
          (regimen.orderSetMembers || []).map(order => {
            try {
              return JSON.parse(order.orderTemplate);
            } catch (e) {
              return null;
            }
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
    default:
      return state;
  }
}

export default orderPageReducer;
