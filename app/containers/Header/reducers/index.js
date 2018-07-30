import { combineReducers } from 'redux';
// import locationReducer from './locationReducer';
// import noteReducer from './noteReducer';
// import patientReducer from './patientReducer';
import sessionReducer from './sessionReducer';
// import careSettingReducer from './careSettingReducer';
// import activeOrderReducer from './activeOrderReducer';
import settingEncounterTypeReducer from './settingEncounterTypeReducer';
import settingEncounterRoleReducer from './settingEncounterRoleReducer';
import encounterTypeReducer from './encounterTypeReducer';
import encounterRoleReducer from './encounterRoleReducer';
import encounterReducer from './encounterReducer';
import patientReducer from './patientReducer';

export default combineReducers({
  // locationReducer,
  // noteReducer,
  // patientReducer,
  sessionReducer,
  // careSettingReducer,
  // activeOrderReducer,
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
  encounterTypeReducer,
  encounterRoleReducer,
  encounterReducer,
  patientReducer,
});
