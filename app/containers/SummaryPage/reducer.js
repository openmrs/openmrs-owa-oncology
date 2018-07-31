/*
 *
 * SummaryPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION,POST_ENCOUNTER_SUCCESS } from './constants';

export const initialState = fromJS({});

function summaryPageReducer(state = initialState, action) {
  switch (action.type) {
    case POST_ENCOUNTER_SUCCESS:
      return state
        .set('encounter', action.encoutner);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default summaryPageReducer;
