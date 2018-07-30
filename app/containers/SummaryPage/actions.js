import { POST_CHEMO_ORDER, POST_ENCOUNTER_SUCCESS, POST_ENCOUNTER_ERROR, POST_CHEMO_ORDER_SUCCESS, POST_CHEMO_ORDER_ERROR } from "../OrderPage/constants";

/*
 *
 * SummaryPage actions
 *
 */

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