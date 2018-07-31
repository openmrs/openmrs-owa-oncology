import { 
  POST_CHEMO_ORDER,
  POST_ENCOUNTER, 
  POST_ENCOUNTER_SUCCESS,
  POST_ENCOUNTER_ERROR,
  POST_ORDERGROUP,
  POST_ORDERGROUP_SUCCESS,
  POST_ORDERGROUP_ERROR,
  POST_CHEMO_ORDER_SUCCESS,
  POST_CHEMO_ORDER_ERROR,
} from "./constants";

export function postEncounterAction(encounter) {
  return {
    type: POST_ENCOUNTER,
    encounter,
  }
}

export function postEncounterSuccessAction(encoutner) {
  return {
    type: POST_ENCOUNTER_SUCCESS,
    encoutner,
  }
}

export function postEncounterFailureAction() {
  return {
    type: POST_ENCOUNTER_ERROR,
  }
}

export function postOrderGroupAction(action,encounter) {
  return {
    type: POST_ORDERGROUP,
    action,
    encounter,
  }
}

export function postOrderGroupSuccessAction() {
  return {
    type: POST_ORDERGROUP_SUCCESS,
  }
}

export function postOrderGroupFailureAction() {
  return {
    type: POST_ORDERGROUP_ERROR,
  }
}

export function postChemoOrderAction(orderInfo) {
  return {
    type: POST_CHEMO_ORDER,
    orderInfo,
  }
}

export function postOrderSuccessAction() {
  return {
    type: POST_CHEMO_ORDER_SUCCESS,
  }
}

export function postOrderFailureAction() {
  return {
    type: POST_CHEMO_ORDER_ERROR,
  }
}