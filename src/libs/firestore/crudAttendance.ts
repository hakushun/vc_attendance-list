import { CrudPayload } from '../../redux/modules/attendances';
import { getInstance } from './getInstance';

const db = getInstance();

export const createAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  try {
    await db
      .collection('attendances')
      .doc(eventId)
      .collection('attendance')
      .doc(attendance.userId)
      .set(attendance);
  } catch (err) {
    alert(err);
  }
};

export const updateAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  try {
    await db
      .collection('attendances')
      .doc(eventId)
      .collection('attendance')
      .doc(attendance.userId)
      .set(attendance, { merge: true });
  } catch (err) {
    alert(err);
  }
};

export const removeAttendance = async ({ eventId, attendance }: CrudPayload): Promise<void> => {
  try {
    await db
      .collection('attendances')
      .doc(eventId)
      .collection('attendance')
      .doc(attendance.userId)
      .delete();
  } catch (err) {
    alert(err);
  }
};
