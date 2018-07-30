import {
  FETCH_ENCOUNTER_TYPE_LOADING,
  FETCH_ENCOUNTER_TYPE_SUCCESS,
  FETCH_ENCOUNTER_TYPE_FAILURE,
} from '../constants';
import initialState from './initialState';

const encounterType = (state = initialState.get('encounterTypeReducer'), action) => {
  switch (action.type) {
    case FETCH_ENCOUNTER_TYPE_LOADING:
      return state
        .set('isLoading', action.status);
    case FETCH_ENCOUNTER_TYPE_SUCCESS:
      return state
        .set('encounterType', action.configuration)
        .set('error', null)
        .set('isLoading', false)
    case FETCH_ENCOUNTER_TYPE_FAILURE:
      return state
        .set('error', action.error)
        .set('encounterType', {})
        .set('isLoading', false)
    default:
      return state;
  }
};

export default encounterType;
