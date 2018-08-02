import { fromJS } from "immutable";
import {
  LOAD_PATIENT,
  LOAD_PATIENT_SUCCESS,
  LOAD_PATIENT_ERROR,
} from '../constants';
import initialState from './initialState';

export default (state = initialState.get('defaultPatient'), action) => {
  switch (action.type) {
    case LOAD_PATIENT:
      return state.setIn(['loading', 'patientUuid'], true);
    case LOAD_PATIENT_SUCCESS:
      return state
        .set('patient', fromJS(action.patient));
    case LOAD_PATIENT_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
};
