import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import initFirebase from '../libs/firebase/initFirebase';
import { mapUserData } from '../libs/utils/mapUserData';
import {
  AuthPayload,
  signUp,
  signIn,
  signOut,
  selectIsLoading,
  selectUser,
  auth,
  Userdata,
} from '../redux/modules/user';

initFirebase();

type Hooks = {
  user: Userdata;
  isLoading: boolean;
  handleSignUp: (_: AuthPayload) => Promise<void>;
  handleSignIn: (_: AuthPayload) => Promise<void>;
  handleSignOut: () => Promise<void>;
};
export const useUser = (): Hooks => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const handleSignUp = async ({ email, password }: AuthPayload) => {
    await dispatch(signUp({ email, password }));
    router.push('/');
  };
  const handleSignIn = async ({ email, password }: AuthPayload) => {
    await dispatch(signIn({ email, password }));
    router.push('/');
  };
  const handleSignOut = async () => {
    await dispatch(signOut());
    router.push('/login');
  };

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (usr) => {
      if (usr) {
        dispatch(auth(mapUserData(usr)));
      } else {
        dispatch(auth(null));
        router.push('/login');
      }
    });
    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isLoading, handleSignUp, handleSignIn, handleSignOut };
};
