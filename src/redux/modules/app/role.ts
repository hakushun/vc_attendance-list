import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from '../reducers';
import { initiateAttendance } from './attendance';
import { remove } from '../domain/attendances';
import { signOut } from './sign';

export type RoleItem = {
  userId: string;
  [programId: string]: string;
};
// action
const actionCreator = actionCreatorFactory();

export const changeRole = actionCreator<RoleItem>('CHANGE_ROLE');

// initial state
const INITIAL_STATE = {};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(changeRole, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .cases([initiateAttendance, remove.async.done, signOut.async.done], () => ({
    ...INITIAL_STATE,
  }));
export default reducer;

// selector
export const selectRole = createSelector(
  [
    (state: RootState) => state.domain.roles.roles,
    (state: RootState) => state.app.user.user,
    (state: RootState) => state.app.role,
  ],
  (roles, user, role) => ({
    userId: '',
    ...roles.find((item) => item.userId === user?.id),
    ...role,
  }),
);
