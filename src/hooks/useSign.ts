import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import initFirebase from '../libs/firebase/initFirebase';
import {
  signUp,
  signIn,
  signOut,
  selectIsLoading,
  selectSignForm,
  SignForm,
  change,
} from '../redux/modules/sign';

initFirebase();

type Hooks = {
  form: SignForm;
  isLoading: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  handleSignIn: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  handleSignOut: () => Promise<void>;
};
export const useSign = (): Hooks => {
  const dispatch = useDispatch();
  const form = useSelector(selectSignForm);
  const isLoading = useSelector(selectIsLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(change({ [e.target.id]: e.target.value }));
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await dispatch(signUp(form));
  };
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await dispatch(signIn(form));
  };
  const handleSignOut = async () => {
    await dispatch(signOut());
  };

  return { form, isLoading, handleChange, handleSignUp, handleSignIn, handleSignOut };
};
