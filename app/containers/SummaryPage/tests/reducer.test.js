import { fromJS } from 'immutable';
import summaryPageReducer from '../reducer';

describe('summaryPageReducer', () => {
  it('returns the initial state', () => {
    expect(summaryPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
