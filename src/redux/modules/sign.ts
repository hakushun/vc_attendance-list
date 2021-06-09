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
import { Userdata } from './user';

export type SignForm = {
  email: string;
  password: string;
};
export type Sign = {
  form: SignForm;
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
const asyncActionCreator = asyncFactory<Sign>(actionCreator);

export const change = actionCreator<Partial<SignForm>>('CHAGNE_FORM');
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
const INITIAL_STATE: Sign = {
  form: {
    email: '',
    password: '',
  },
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(change, (state, payload) => ({
    ...state,
    form: {
      ...state.form,
      ...payload,
    },
  }))
  .cases([signUp.async.started, signIn.async.started, signOut.async.started], (state) => ({
    ...state,
    isLoading: true,
  }))
  .cases([signUp.async.done, signIn.async.done, signOut.async.done], () => ({
    ...INITIAL_STATE,
  }))
  .cases([signUp.async.failed, signIn.async.failed, signOut.async.failed], (state) => ({
    ...state,
    isLoading: false,
  }));
export default reducer;

// selector
export const selectSignForm = createSelector(
  [(state: RootState) => state.ui.sign.form],
  (form) => form,
);

export const selectIsLoading = createSelector(
  [(state: RootState) => state.ui.sign.isLoading],
  (isLoading) => isLoading,
);
