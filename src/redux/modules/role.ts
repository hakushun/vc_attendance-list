import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';
import { subscribeRoles } from './roles';

export type RoleItem = {
  userId: string;
  [programId: string]: string;
};
export type Role = {
  programId: string;
  roles: RoleItem[];
};
type ChangeRadioPayload = {
  programId: string;
};
// action
const actionCreator = actionCreatorFactory();

export const changeRadio = actionCreator<ChangeRadioPayload>('CHANGE_RADIO');
export const changeRole = actionCreator<RoleItem>('CHANGE_ROLE');

// initial state
const INITIAL_STATE: Role = {
  programId: '',
  roles: [],
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(changeRadio, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(changeRole, (state, payload) => ({
    ...state,
    roles: state.roles.some((role) => role.userId === payload.userId)
      ? state.roles.map((role) => (role.userId === payload.userId ? { ...role, ...payload } : role))
      : [...state.roles, payload],
  }))
  .case(subscribeRoles, (state, payload) => ({
    ...state,
    roles: payload,
  }));
export default reducer;

// selector
export const selectProgramId = createSelector(
  [(state: RootState) => state.app.role.programId],
  (programId) => programId,
);
export const selectRoles = createSelector(
  [(state: RootState) => state.app.role.roles],
  (roles) => roles,
);
