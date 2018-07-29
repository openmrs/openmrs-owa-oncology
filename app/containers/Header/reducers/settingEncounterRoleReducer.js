import initialState from './initialState';
import {
  SETTING_ENCOUNTER_ROLE_SUCCESS,
  SETTING_ENCOUNTER_ROLE_FAILURE,
  SETTING_ENCOUNTER_ROLE_LOADING,
} from '../constants';

const settingEncounterRoleReducer = (
  state = initialState.get('defaultSettingEncounterRole'),
  action,
) => {
  switch (action.type) {
    case SETTING_ENCOUNTER_ROLE_LOADING:
      return state
        .set('isLoading', true);
    case SETTING_ENCOUNTER_ROLE_SUCCESS:
      return state
        .set('settingEncounterRole', action.configuration)
        .set('error', null)
        .set('isLoading', false)
    case SETTING_ENCOUNTER_ROLE_FAILURE:
      return state
        .set('error', action.error)
        .set('isLoading', false)
    default:
      return state;
  }
};

export default settingEncounterRoleReducer;
