// import { createSelector } from 'reselect';
import initialState from './reducers/initialState';

/**
 * Direct selector to the header state domain
 */

const selectCurrentSessionDomain = state => state.get('currentSession', initialState);
const selectDefaultSettingEncounterTypeDomain = state => state.get('defaultSettingEncounterType', initialState);
const selectDefaultSettingEncounterRoleDomain = state => state.get('defaultSettingEncounterRole', initialState);
// const selectSettingEncounterTypeDomain = state => state.get('settingEncounterTypeReducer', initialState);
const selectSettingEncounterRoleDomain = state => state.get('settingEncounterRoleReducer', initialState);

const selectHeaderDomain = state => state.get('header', initialState);


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

const makeSelectEncounterRole = () =>
  selectSettingEncounterRoleDomain;

const makeSelectEncounterType = () =>
  selectHeaderDomain;
  // createSelector(selectHeaderDomain, substate =>
  //   substate.get('settingEncounterTypeReducer'),
  // );

	
export default makeSelectCurrentSession;
export { makeSelectCurrentSession, makeSelectDefaultEncounterRole, makeSelectDefaultEncounterType, makeSelectEncounterRole, makeSelectEncounterType };
