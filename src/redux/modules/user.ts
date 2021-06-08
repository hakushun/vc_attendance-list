import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  signInWithFirebase,
  signOutWithFirebase,
  signUpWithFirebase,
} from '../../libs/firebase/firebaseAuth';
import { RootState } from './reducers';

export type Userdata = {
  id: string;
  email: string;
} | null;
export type User = {
  user: Userdata;
  isLoading: boolean;
};
export type AuthPayload = {
  email: string;
  password: string;
};
interface CustomError extends Error {
  name: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<User>(actionCreator);

export const auth = actionCreator<Userdata>('AUTH_USER');
export const signUp = asyncActionCreator<AuthPayload, Userdata, CustomError>(
  'SIGNUP_USER',
  async (payload) => {
    const user = await signUpWithFirebase(payload);
    return user;
  },
);
export const signIn = asyncActionCreator<AuthPayload, Userdata, CustomError>(
  'SIGNIN_USER',
  async (payload) => {
    const user = await signInWithFirebase(payload);
    return user;
  },
);
export const signOut = asyncActionCreator<void, void, CustomError>('SIGNOUT_USER', async () => {
  await signOutWithFirebase();
});

// initial state
const INITIAL_STATE: User = {
  user: null,
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(auth, (state, payload) => ({
    ...state,
    user: payload,
  }))
  .cases([signUp.async.started, signIn.async.started, signOut.async.started], (state) => ({
    ...state,
    isLoading: true,
  }))
  .cases([signUp.async.done, signIn.async.done], (state, payload) => ({
    ...state,
    ...payload,
    isLoading: false,
  }))
  .case(signOut.async.done, (state) => ({
    ...state,
    user: null,
    isLoading: false,
  }))
  .cases([signUp.async.failed, signIn.async.failed, signOut.async.failed], (state) => ({
    ...state,
    isLoading: false,
  }));
export default reducer;

// selector
export const selectUser = createSelector(
  [(state: RootState) => state.resources.user.user],
  (user) => user,
);

export const selectIsLoading = createSelector(
  [(state: RootState) => state.resources.user.isLoading],
  (isLoading) => isLoading,
);
