import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { focusPractice } from './practice';
import { RootState } from './reducers';

type KeyName = 'practice';
export type Modal = Record<KeyName, boolean>;

// action
const actionCreator = actionCreatorFactory();

export const togglePracticeModal = actionCreator<boolean>('TOGGLE_PRACTICE_MODAL');
export const closeAllModal = actionCreator('CLOSE_ALL_MODAL');

// initial state
const INITIAL_STATE: Modal = {
  practice: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(togglePracticeModal, (state, payload) => ({
    ...state,
    practice: payload,
  }))
  .case(closeAllModal, () => ({ ...INITIAL_STATE }))
  .case(focusPractice, (state) => ({
    ...state,
    practice: true,
  }));
export default reducer;

// selector
export const selectPracticeModalIsShown = createSelector(
  [(state: RootState) => state.ui.modal.practice],
  (practice) => practice,
);
