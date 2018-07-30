import { createSelector } from 'reselect';
import initialState from './reducers/initialState';

/**
 * Direct selector to the header state domain
 */

const selectCurrentSessionDomain = state => state.get('currentSession', initialState);

const selectHeaderDomain = state => state.get('header', initialState);

const selectSettingDefaultEncounterTypeReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.settingEncounterTypeReducer)

const selectSettingDefaultEncounterRoleReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.settingEncounterRoleReducer)

const selectEncounterTypeReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.encounterTypeReducer)

const selectEncounterRoleReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.encounterRoleReducer)

const selectSessionReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.sessionReducer)

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectCurrentSession = () =>
  selectCurrentSessionDomain;

const makeSelectDefaultEncounterType = () =>
  createSelector(selectSettingDefaultEncounterTypeReducer(), substate =>
    substate.getIn(['settingEncounterType']).results[0].value
  );

const makeSelectDefaultEncounterRole = () =>
  createSelector(selectSettingDefaultEncounterRoleReducer(), substate =>
    substate.getIn(['settingEncounterRole']).results[0].value
  );

const makeSelectEncounterType = () => 
  createSelector(selectEncounterTypeReducer(), substate =>
    substate.getIn(['encounterType'])
  );

const makeSelectEncounterRole = () => 
  createSelector(selectEncounterRoleReducer(), substate =>
    substate.getIn(['encounterRole'])
  );

const makeSelectEncounterProvider = () =>
  createSelector(selectSessionReducer(), substate =>
    substate.get('currentProvider')
  );

const makeSelectEncounterLocation = () => 
  createSelector(selectSessionReducer(), substate =>
    substate.get('currentLocation')
  );


	
export default makeSelectCurrentSession;
export { makeSelectCurrentSession, makeSelectDefaultEncounterRole, makeSelectDefaultEncounterType,  makeSelectEncounterRole, makeSelectEncounterProvider, makeSelectEncounterType, makeSelectEncounterLocation};
