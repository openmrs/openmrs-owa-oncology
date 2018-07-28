/*
 *
 * Header actions
 *
 */

import { 
  DEFAULT_ACTION, 
  SET_CURRENT_SESSION,
  SET_CURRENT_SESSION_SUCCESS,
  SET_CURRENT_SESSION_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// Load patient from uuid
export function loadCurrentSession() {
  return {
    type: SET_CURRENT_SESSION,
  };
}

export function loadCurrentSessionSuccess(currentSession) {
  return {
    type: SET_CURRENT_SESSION_SUCCESS,
    currentSession,
  };
}

export function loadCurrentSessionError(error) {
  return {
    type: SET_CURRENT_SESSION_ERROR,
    error,
  };
}