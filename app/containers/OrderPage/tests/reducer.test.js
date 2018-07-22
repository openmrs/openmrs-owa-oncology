import { fromJS } from 'immutable';
import orderPageReducer from '../reducer';

describe('orderPageReducer', () => {
  it('returns the initial state', () => {
    expect(orderPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
