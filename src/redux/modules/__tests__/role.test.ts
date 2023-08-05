/* eslint-disable no-undefined */
import reducer, { changeRole, selectRole } from '../app/role';
import { initialState } from './_initialState';

// reducer
describe('Reducer: role', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      userId: '',
    });
  });
  it('Action: changeRole', () => {
    const state = {
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      '01F937NXKS2YDN1M98MZ9G1JWB': '降り番',
    };
    const payload = {
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      '01F937NK2V8K2W2F6QC9PKJZRP': '乗り番',
    };
    const action = changeRole(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      '01F937NXKS2YDN1M98MZ9G1JWB': '降り番',
      '01F937NK2V8K2W2F6QC9PKJZRP': '乗り番',
    });
  });
});

// selector
describe('Selector: role', () => {
  it('selectRole', () => {
    const result = {
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      '01F937NXKS2YDN1M98MZ9G1JWB': '降り番',
      '01F937NK2V8K2W2F6QC9PKJZRP': '乗り番',
    };
    expect(result).toEqual(selectRole(initialState));
  });
});
