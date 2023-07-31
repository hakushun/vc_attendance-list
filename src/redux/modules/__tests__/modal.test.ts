/* eslint-disable no-undefined */
import reducer, {
  closeAllModal,
  selectPasswordResetIsShown,
  selectPracticeModalIsShown,
  togglePasswordReset,
  togglePracticeModal,
} from '../ui/modal';
import { focusPractice } from '../domain/practice';
import { resetPassword } from '../app/sign';
import { initialState } from './_initialState';

// reducer
describe('Reducer: modal', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      practice: false,
      covidResult: false,
      passwordReset: false,
    });
  });

  it('Action: togglePracticeModal', () => {
    const action = togglePracticeModal(true);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      practice: true,
      covidResult: false,
      passwordReset: false,
    });
  });
  it('Action: togglePasswordReset', () => {
    const action = togglePasswordReset(true);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      practice: false,
      covidResult: false,
      passwordReset: true,
    });
  });
  it('Action: closeAllModal', () => {
    const action = closeAllModal();
    const result = reducer(undefined, action);
    expect(result).toEqual({
      practice: false,
      covidResult: false,
      passwordReset: false,
    });
  });
  it('Action: focusPractice', () => {
    const action = focusPractice('');
    const result = reducer(undefined, action);
    expect(result).toEqual({
      practice: true,
      covidResult: false,
      passwordReset: false,
    });
  });
  it('Action: resetPassword.async.done', () => {
    const action = resetPassword.async.done({ params: { email: '' }, result: undefined });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      practice: false,
      covidResult: false,
      passwordReset: false,
    });
  });
});

// selector
describe('Selector: modal', () => {
  it('selectPracticeModalIsShown', () => {
    const result = false;
    expect(result).toEqual(selectPracticeModalIsShown(initialState));
  });
  it('selectPasswordResetIsShown', () => {
    const result = false;
    expect(result).toEqual(selectPasswordResetIsShown(initialState));
  });
});
