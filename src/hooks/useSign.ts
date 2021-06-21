import { useDispatch, useSelector } from 'react-redux';
import initFirebase from '../libs/firebase/initFirebase';
import { isSignFormInvalid } from '../libs/utils/isSignFormInvalid';
import {
  signUp,
  signIn,
  signOut,
  selectIsLoading,
  selectSignForm,
  SignForm,
  change,
} from '../redux/modules/sign';
import { useRouter } from './useRouter';

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
  const { router } = useRouter();
  const form = useSelector(selectSignForm);
  const isLoading = useSelector(selectIsLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(change({ [e.target.id]: e.target.value }));
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isSignFormInvalid(form)) return;
    await dispatch(signUp(form));
    router.push('/');
  };
  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isSignFormInvalid(form)) return;
    await dispatch(signIn(form));
    router.push('/');
  };
  const handleSignOut = async () => {
    await dispatch(signOut());
  };

  return { form, isLoading, handleChange, handleSignUp, handleSignIn, handleSignOut };
};
