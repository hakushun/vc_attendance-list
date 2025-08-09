import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './initFirebase';
import { AuthPayload } from '../../redux/modules/app/sign';
import { Userdata } from '../../redux/modules/app/user';
import { mapUserData } from '../utils/mapUserData';

export const signUpWithFirebase = async ({ email, password }: AuthPayload): Promise<Userdata> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (!user) return null;
  return mapUserData(user);
};

export const signInWithFirebase = async ({ email, password }: AuthPayload): Promise<Userdata> => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  if (!user) return null;
  return mapUserData(user);
};

export const signOutWithFirebase = async (): Promise<void> => {
  await signOut(auth);
};

export const resetUserPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};
