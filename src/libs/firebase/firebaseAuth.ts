import firebase from 'firebase/app';

type AuthPayload = {
  email: string;
  password: string;
};

export const signUp = async ({ email, password }: AuthPayload): Promise<firebase.User | null> => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return user;
  } catch(err) {
    // TODO: エラー処理追加
    alert(err);
    return null;
  }
};

export const signIn = async ({ email, password }: AuthPayload): Promise<firebase.User | null> => {
  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user;
  } catch(err) {
    // TODO: エラー処理追加
    alert(err);
    return null;
  }
};

export const signOut = async (): Promise<void> => {
  await firebase.auth().signOut();
};
