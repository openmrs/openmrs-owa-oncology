import initialState from './initialState';
import {
  SETTING_ENCOUNTER_TYPE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_FAILURE,
  SETTING_ENCOUNTER_TYPE_LOADING,
} from '../constants'

const settingEncounterTypeReducer = (
  state = initialState.get('defaultSettingEncounterType'),
  action,
) => {
  switch (action.type) {
    case SETTING_ENCOUNTER_TYPE_LOADING:
      return state  
        .set('isLoading',true);
    case SETTING_ENCOUNTER_TYPE_SUCCESS:
      return state
        .set('settingEncounterType', action.configuration)
        .set('error', null)
        .set('isLoading', false)
    case SETTING_ENCOUNTER_TYPE_FAILURE:
      return state
        .set('error', action.error)
        .set('isLoading', false)
    default:
      return state;
  }
};

export default settingEncounterTypeReducer;
