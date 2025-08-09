import { db } from '../firebase/initFirebase';

export const getInstance = () => {
  return db;
};
