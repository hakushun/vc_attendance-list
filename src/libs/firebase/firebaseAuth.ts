import firebase from 'firebase/app';
import { AuthPayload, Userdata } from '../../redux/modules/user';
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
