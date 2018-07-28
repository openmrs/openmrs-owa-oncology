import { combineReducers } from 'redux';
// import locationReducer from './locationReducer';
// import noteReducer from './noteReducer';
// import patientReducer from './patientReducer';
import sessionReducer from './sessionReducer';
// import careSettingReducer from './careSettingReducer';
// import encounterReducer from './encounterReducer';
// import activeOrderReducer from './activeOrderReducer';
import settingEncounterTypeReducer from './settingEncounterTypeReducer';
import settingEncounterRoleReducer from './settingEncounterRoleReducer';
// import encounterRoleReducer from './encounterRoleReducer';

export default combineReducers({
  // locationReducer,
  // noteReducer,
  // patientReducer,
  sessionReducer,
  // careSettingReducer,
  // encounterReducer,
  // activeOrderReducer,
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
  // encounterRoleReducer,
});
