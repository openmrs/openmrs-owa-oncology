import {
  FETCH_ORDER_GROUP_SUCCESS,
  FETCH_ORDER_GROUP_LOADING,
  FETCH_ORDER_GROUP_FAILURE,
} from '../constants';
import initialState from './initialState';

const encounter = (state = initialState.get('orderGroupReducer'), action) => {
  switch (action.type) {
    case FETCH_ORDER_GROUP_LOADING:
      return state
        .set('loading', true);
    case FETCH_ORDER_GROUP_SUCCESS:
      return state
        .set('orderGroups', action.encounters)
        .set('error', null)
        .set('loading', false);
    case FETCH_ORDER_GROUP_FAILURE:
      return state
        .set('error', action.error)
        .set('orderGroups', {})
        .set('loading', false);
    default:
      return state;
  }
};

export default encounter;
