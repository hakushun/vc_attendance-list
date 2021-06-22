import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { fetch } from './covids';
import { focusPractice } from './practice';
import { RootState } from './reducers';

type KeyName = 'practice' | 'covidResult';
export type Modal = Record<KeyName, boolean>;

// action
const actionCreator = actionCreatorFactory();

export const togglePracticeModal = actionCreator<boolean>('TOGGLE_PRACTICE_MODAL');
export const toggleCovidResult = actionCreator<boolean>('TOGGLE_COVID_RESULT');
export const closeAllModal = actionCreator('CLOSE_ALL_MODAL');

// initial state
const INITIAL_STATE: Modal = {
  practice: false,
  covidResult: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(togglePracticeModal, (state, payload) => ({
    ...state,
    practice: payload,
  }))
  .case(toggleCovidResult, (state, payload) => ({
    ...state,
    covidResult: payload,
  }))
  .case(closeAllModal, () => ({ ...INITIAL_STATE }))
  .case(focusPractice, (state) => ({
    ...state,
    practice: true,
  }))
  .case(fetch.async.started, (state) => ({
    ...state,
    covidResult: true,
  }));
export default reducer;

// selector
export const selectPracticeModalIsShown = createSelector(
  [(state: RootState) => state.ui.modal.practice],
  (practice) => practice,
);
export const selectCovidResultIsShown = createSelector(
  [(state: RootState) => state.ui.modal.covidResult],
  (covidResult) => covidResult,
);
