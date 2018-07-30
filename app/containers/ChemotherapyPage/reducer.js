/*
 *
 * ChemotherapyPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_OBSERVATIONS,
  LOAD_OBSERVATIONS_SUCCESS,
  LOAD_OBSERVATIONS_ERROR,
  CREATE_OBSERVATION,
  CREATE_OBSERVATION_SUCCESS,
  CREATE_OBSERVATION_ERROR,
} from './constants';

export const initialState = fromJS({
  observations: {},
  observation: {},
  loading: {},
  error: {},
});

function chemotherapyPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_OBSERVATIONS:
      return state.setIn(['loading', 'observations'], true);
    case LOAD_OBSERVATIONS_SUCCESS:
      return state.setIn(['observations'], action.observations);
    case LOAD_OBSERVATIONS_ERROR:
      return state.set('error', action.error);
    case CREATE_OBSERVATION:
      return state.setIn(['loading', 'createObservation'], true);
    case CREATE_OBSERVATION_SUCCESS:
      return state.setIn(['observation'], action.observation);
    case CREATE_OBSERVATION_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default chemotherapyPageReducer;
