import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { generateId } from '../../libs/ulid/generateId';
import { subscribeProgram } from './programs';
import { RootState } from './reducers';

export type Program = {
  id: string;
  name: string;
};

// action
const actionCreator = actionCreatorFactory();

export const addProgramForm = actionCreator('ADD_PROGRAM_FORM');
export const deleteProgramForm = actionCreator('DELETE_PROGRAM_FORM');
export const changeProgram = actionCreator<Program>('CHANGE_PROGRAM');

// initial state
const INITIAL_STATE: Program[] = [];

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(addProgramForm, (state) =>
    state.length < 11 ? [...state, { id: generateId(), name: '' }] : [...state],
  )
  .case(deleteProgramForm, (state) =>
    state.length === 0 ? [...state] : [...state].slice(0, state.length - 1),
  )
  .case(changeProgram, (state, payload) =>
    state.map((item) => (item.id === payload.id ? payload : item)),
  )
  .case(subscribeProgram, (_state, payload) => [...payload]);
export default reducer;

// selector
export const selectProgram = createSelector(
  [(state: RootState) => state.app.program],
  (program) => program,
);
