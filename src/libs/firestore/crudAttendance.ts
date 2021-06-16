import { CrudPayload } from '../../redux/modules/attendances';
import { getInstance } from './getInstance';

const db = getInstance();

// TODO: try/catch
export const createAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  await db
    .collection('attendances')
    .doc(eventId)
    .collection('attendance')
    .doc(attendance.userId)
    .set(attendance);
};

export const updateAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  await db
    .collection('attendances')
    .doc(eventId)
    .collection('attendance')
    .doc(attendance.userId)
    .set(attendance, { merge: true });
};

export const removeAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  await db
    .collection('attendances')
    .doc(eventId)
    .collection('attendance')
    .doc(attendance.userId)
    .delete();
};
