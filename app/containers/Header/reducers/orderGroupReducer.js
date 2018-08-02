import { fromJS } from "immutable";
import {
  FETCH_ORDER_GROUP_SUCCESS,
  FETCH_ORDER_GROUP_LOADING,
  FETCH_ORDER_GROUP_FAILURE,
  LOAD_EXTENDED_ORDER_GROUPS,
  LOAD_EXTENDED_ORDER_GROUPS_SUCCESS,
  LOAD_EXTENDED_ORDER_GROUPS_ERROR,
} from '../constants';
import initialState from './initialState';

const encounter = (state = initialState.get('orderGroupReducer'), action) => {
  switch (action.type) {
    case FETCH_ORDER_GROUP_LOADING:
      return state
        .set('loading', true);
    case FETCH_ORDER_GROUP_SUCCESS:
      return state
        .set('orderGroups', fromJS(action.orderGroups))
        .set('error', null)
        .set('loading', false);
    case FETCH_ORDER_GROUP_FAILURE:
      return state
        .set('error', action.error)
        .set('orderGroups', {})
        .set('loading', false);
    case LOAD_EXTENDED_ORDER_GROUPS:
      return state
        .set('loading', true);
    case LOAD_EXTENDED_ORDER_GROUPS_SUCCESS:
      return state
        .set('extendedOrderGroups', fromJS(action.orderGroups))
        .set('error', null)
        .set('loading', false);
    case LOAD_EXTENDED_ORDER_GROUPS_ERROR:
      return state
        .set('error', action.error)
        .set('extendedOrderGroups', {})
        .set('loading', false);
    default:
      return state;
  }
};

export default encounter;
