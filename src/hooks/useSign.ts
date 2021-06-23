import { useDispatch, useSelector } from 'react-redux';
import initFirebase from '../libs/firebase/initFirebase';
import { isEmail } from '../libs/utils/isEmail';
import { isSignFormInvalid } from '../libs/utils/isSignFormInvalid';
import {
  signUp,
  signIn,
  signOut,
  selectIsLoading,
  selectSignForm,
  SignForm,
  change,
  selectResetForm,
  changeResetForm,
  resetPassword,
} from '../redux/modules/sign';
import { useRouter } from './useRouter';

initFirebase();

type Hooks = {
  form: SignForm;
  resetForm: { email: string };
  isLoading: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeResetForm: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  handleSignIn: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleResetPassword: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
};
export const useSign = (): Hooks => {
  const dispatch = useDispatch();
  const { router } = useRouter();
  const form = useSelector(selectSignForm);
  const resetForm = useSelector(selectResetForm);
  const isLoading = useSelector(selectIsLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(change({ [e.target.id]: e.target.value }));
  };
  const handleChangeResetForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeResetForm({ email: e.target.value }));
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
  const handleResetPassword = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!isEmail(resetForm.email)) return;
    await dispatch(resetPassword(resetForm));
  };
  return {
    form,
    resetForm,
    isLoading,
    handleChange,
    handleChangeResetForm,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleResetPassword,
  };
};
