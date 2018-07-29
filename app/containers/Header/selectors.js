import { createSelector } from 'reselect';
import initialState from './reducers/initialState';

/**
 * Direct selector to the header state domain
 */

const selectCurrentSessionDomain = state => state.get('currentSession', initialState);
const selectDefaultSettingEncounterTypeDomain = state => state.get('defaultSettingEncounterType', initialState);
const selectDefaultSettingEncounterRoleDomain = state => state.get('defaultSettingEncounterRole', initialState);

const selectHeaderDomain = state => state.get('header', initialState);

const selectSettingEncounterTypeReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.settingEncounterTypeReducer)

const selectSettingEncounterRoleReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.settingEncounterRoleReducer)

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectCurrentSession = () =>
  selectCurrentSessionDomain;

const makeSelectDefaultEncounterRole = () =>
  selectDefaultSettingEncounterTypeDomain;

const makeSelectDefaultEncounterType = () =>
  selectDefaultSettingEncounterRoleDomain;

const makeSelectEncounterType = () =>
  createSelector(selectSettingEncounterTypeReducer(), substate =>
    substate.getIn(['settingEncounterType']).results[0].value
  );

const makeSelectEncounterRole = () =>
  createSelector(selectSettingEncounterRoleReducer(), substate =>
    substate.getIn(['settingEncounterRole']).results[0].value
  );
	
export default makeSelectCurrentSession;
export { makeSelectCurrentSession, makeSelectDefaultEncounterRole, makeSelectDefaultEncounterType, makeSelectEncounterRole, makeSelectEncounterType };
