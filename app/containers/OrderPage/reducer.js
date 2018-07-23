/*
 *
 * OrderPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

export const initialState = fromJS({});

function orderPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case 'FETCH_REGIMENS_DONE':
      return action.result;
    default:
      return state;
  }
}

export default orderPageReducer;
