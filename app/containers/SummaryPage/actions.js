import { POST_CHEMO_ORDER } from "../OrderPage/constants";

/*
 *
 * SummaryPage actions
 *
 */

export function postChemoOrder(orderIndex) {
  return {
    type: POST_CHEMO_ORDER,
    orderIndex,
  }
}