import { User } from 'firebase/auth';

export interface FirebaseUser extends Partial<User> {
  uid: string;
  email: string | null;
}

export const mapUserData = (user: FirebaseUser): { id: string; email: string } => {
  const { uid, email } = user;
  return {
    id: uid,
    email: email || '',
  };
};
