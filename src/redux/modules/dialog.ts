import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createSelector } from 'reselect';
import { RootState } from './reducers';

export type Message = {
  title: string;
  description: string;
}
type Dialog = {
  isOpened: boolean;
  message: Message;
}
// action
const actionCreator = actionCreatorFactory();
export const toggle = actionCreator<boolean>('TOGGLE_DIALOG');

// initial state
const INITIAL_STATE: Dialog= {
  isOpened: false,
  message: {
    title: '',
    description: '',
  },
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(toggle, (state, payload) => ({
    ...state,
    isOpened: payload,
  }));
export default reducer;

// selector
export const selectDialogIsOpened = createSelector(
  [(state: RootState) => state.ui.dialog.isOpened],
  (isOpened) => isOpened,
);
export const selectDialogMessage = createSelector(
  [(state: RootState) => state.ui.dialog.message],
  (message) => message,
);
