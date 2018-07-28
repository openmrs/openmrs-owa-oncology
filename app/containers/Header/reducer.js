/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION,  SET_CURRENT_SESSION_SUCCESS } from './constants';

export const initialState = fromJS({
  encounter: {},
  currentSession: {},
  loading: {
    currentSession: false,
  },
  error: '',
});

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_CURRENT_SESSION_SUCCESS:
      return state.set('currentSession', action.currentSession);
    default:
      return state;
  }
}

export default headerReducer;
