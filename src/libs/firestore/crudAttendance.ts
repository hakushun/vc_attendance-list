import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { CrudPayload } from '../../redux/modules/domain/attendances';
import { removeRole } from './crudRole';
import { getInstance } from './getInstance';

const db = getInstance();

export const createAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  const docRef = doc(db, 'attendances', eventId, 'attendance', attendance.userId);
  await setDoc(docRef, attendance);
};

export const updateAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  const docRef = doc(db, 'attendances', eventId, 'attendance', attendance.userId);
  await setDoc(docRef, attendance, { merge: true });
};

export const removeAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  const docRef = doc(db, 'attendances', eventId, 'attendance', attendance.userId);
  await deleteDoc(docRef);
  await removeRole({ eventId, userId: attendance.userId });
};
