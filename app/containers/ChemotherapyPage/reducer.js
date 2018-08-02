/*
 *
 * ChemotherapyPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_OBSERVATION,
  CREATE_OBSERVATION_SUCCESS,
  CREATE_OBSERVATION_ERROR,
} from './constants';

export const initialState = fromJS({
  observation: {},
  loading: {},
  error: {},
});

function chemotherapyPageReducer(state = initialState, action) {
  switch (action.type) {
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
