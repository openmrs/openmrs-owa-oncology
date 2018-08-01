/*
 *
 * ChemotherapyPage actions
 *
 */

import {
  CREATE_OBSERVATION,
  CREATE_OBSERVATION_SUCCESS,
  CREATE_OBSERVATION_ERROR,
} from './constants';



export function createObservation(observation) {
  return {
    type: CREATE_OBSERVATION,
    observation,
  };
}

export function observationCreated(observation) {
  return {
    type: CREATE_OBSERVATION_SUCCESS,
    observation,
  };
}

export function observationCreatingError(error) {
  return {
    type: CREATE_OBSERVATION_ERROR,
    error,
  };
}
