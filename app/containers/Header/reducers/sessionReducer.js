import {SET_CURRENT_SESSION_LOADING,SET_CURRENT_SESSION_SUCCESS, SET_CURRENT_SESSION_FAILURE } from '../constants';
import initialState from './initialState';

export default (state = initialState.get('defaultSession'), action) => {
  switch (action.type) {
    case SET_CURRENT_SESSION_LOADING:
      return state
        .set('isLoading', action.status);
    case SET_CURRENT_SESSION_SUCCESS:
      return state
        .set('currentUser', action.currentSession.user ? action.currentSession.user.display : '')
        .set('currentLocation', action.currentSession.sessionLocation)
        .set('currentProvider', action.currentSession.currentProvider)
        .set('error', null)
        .set('isLoading', false)
    case SET_CURRENT_SESSION_FAILURE:
      return state
        .set('error', action.error)
        .set('currentUser', null)
        .set('currentLocation', null)
        .set('currentProvider', null)
        .set('isLoading', false)
    default:
      return state;
  }
};
