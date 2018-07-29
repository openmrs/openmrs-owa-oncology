import {
  FETCH_ENCOUNTER_ROLE_LOADING,
  FETCH_ENCOUNTER_ROLE_SUCCESS,
  FETCH_ENCOUNTER_ROLE_FAILURE,
} from '../constants';
import initialState from './initialState';

const encounterRole = (state = initialState.get('encounterRoleReducer'), action) => {
  switch (action.type) {
    case FETCH_ENCOUNTER_ROLE_LOADING:
      return state
        .set('isLoading', action.status);
    case FETCH_ENCOUNTER_ROLE_SUCCESS:
      return state
        .set('encounterRole', action.encounterRole)
        .set('error', null)
        .set('isLoading', false)
    case FETCH_ENCOUNTER_ROLE_FAILURE:
      return state
        .set('error', action.error)
        .set('encounterRole', {})
        .set('isLoading', false)
    default:
      return state;
  }
};

export default encounterRole;
