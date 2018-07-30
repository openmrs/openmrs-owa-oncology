/*
 *
 * ChemotherapyPage actions
 *
 */

import {
  LOAD_OBSERVATIONS,
  LOAD_OBSERVATIONS_SUCCESS,
  LOAD_OBSERVATIONS_ERROR,
  CREATE_OBSERVATION,
  CREATE_OBSERVATION_SUCCESS,
  CREATE_OBSERVATION_ERROR,
} from './constants';

export function loadObservations(params) {
  return {
    type: LOAD_OBSERVATIONS,
    params,
  };
}

export function observationsLoaded(observations) {
  return {
    type: LOAD_OBSERVATIONS_SUCCESS,
    observations,
  };
}

export function observationsLoadingError(error) {
  return {
    type: LOAD_OBSERVATIONS_ERROR,
    error,
  };
}

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
