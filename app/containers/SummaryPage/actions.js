import { POST_CHEMO_ORDER, POST_CHEMO_ORDER_SUCCESS, POST_CHEMO_ORDER_ERROR } from "../OrderPage/constants";

/*
 *
 * SummaryPage actions
 *
 */

export function postChemoOrderAction(order) {
  return {
    type: POST_CHEMO_ORDER,
    order,
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