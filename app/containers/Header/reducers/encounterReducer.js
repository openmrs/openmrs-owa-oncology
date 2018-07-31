import {
  FETCH_ENCOUNTERS_LOADING,
  FETCH_ENCOUNTERS_SUCCESS,
  FETCH_ENCOUNTERS_FAILURE,
  CREATE_ENCOUNTER_LOADING,
  CREATE_ENCOUNTER_SUCCESS,
  CREATE_ENCOUNTER_FAILURE,
} from '../constants';
import initialState from './initialState';

const encounter = (state = initialState.get('encounterReducer'), action) => {
  switch (action.type) {
    case FETCH_ENCOUNTERS_LOADING:
      return state
        .set('isLoading', true);
    case FETCH_ENCOUNTERS_SUCCESS:
      return state
        .set('encounters', action.encounters)
        .set('error', null)
        .set('isLoading', false);
    case FETCH_ENCOUNTERS_FAILURE:
      return state
        .set('error', action.error)
        .set('encounters', {})
        .set('isLoading', false);
    case CREATE_ENCOUNTER_LOADING:
      return state
        .set('isLoading', true);
    case CREATE_ENCOUNTER_SUCCESS:
      return state
        .set('encounters', state.get('encounters').push(action.encounter));
    case CREATE_ENCOUNTER_FAILURE:
      return state
        .set('error', action.error)
    default:
      return state;
  }
};

export default encounter;
