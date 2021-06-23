import firebase from 'firebase/app';
import { AuthPayload } from '../../redux/modules/sign';
import { Userdata } from '../../redux/modules/user';
import { mapUserData } from '../utils/mapUserData';

export const signUpWithFirebase = async ({ email, password }: AuthPayload): Promise<Userdata> => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (!user) return null;
    return mapUserData(user);
  } catch (err) {
    // TODO: エラー処理追加
    alert(err);
    return null;
  }
};

export const signInWithFirebase = async ({ email, password }: AuthPayload): Promise<Userdata> => {
  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    if (!user) return null;
    return mapUserData(user);
  } catch (err) {
    // TODO: エラー処理追加
    alert(err);
    return null;
  }
};

export const signOutWithFirebase = async (): Promise<void> => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    // TODO: エラー処理追加
    alert(err);
  }
};

export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (err) {
    alert(err);
  }
};
