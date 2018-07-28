import { fromJS } from 'immutable';
import chemotherapyPageReducer from '../reducer';

describe('chemotherapyPageReducer', () => {
  it('returns the initial state', () => {
    expect(chemotherapyPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
