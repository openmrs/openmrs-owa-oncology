import { fromJS } from "immutable";
import {
  FETCH_OBSERVATIONS_LOADING,
  FETCH_OBSERVATIONS_SUCCESS,
  FETCH_OBSERVATIONS_FAILURE,
} from '../constants';
import initialState from './initialState';

const observation = (state = initialState.get('observationReducer'), action) => {
  switch (action.type) {
    case FETCH_OBSERVATIONS_LOADING:
      return state
        .set('loading', true);
    case FETCH_OBSERVATIONS_SUCCESS:
      return state
        .set('observations', fromJS(action.observations))
        .set('error', null)
        .set('loading', false);
    case FETCH_OBSERVATIONS_FAILURE:
      return state
        .set('error', action.error)
        .set('observations', {})
        .set('loading', false);
    default:
      return state;
  }
};

export default observation;
