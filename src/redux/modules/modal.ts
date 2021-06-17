import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

type KeyName = 'practice';
export type Modal = Record<KeyName, boolean>;

// action
const actionCreator = actionCreatorFactory();

export const togglePracticeModal = actionCreator<boolean>('TOGGLE_PRACTICE_MODAL');

// initial state
const INITIAL_STATE: Modal = {
  practice: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE).case(
  togglePracticeModal,
  (state, payload) => ({
    ...state,
    practice: payload,
  }),
);
export default reducer;

// selector
export const selectPracticeModalIsShown = createSelector(
  [(state: RootState) => state.ui.modal.practice],
  (practice) => practice,
);
