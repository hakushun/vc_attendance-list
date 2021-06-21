import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { isAttendanceInvalid } from '../libs/utils/isAttendanceInvalid';
import { Attendance, selectAttendance } from '../redux/modules/attendance';
import {
  create,
  remove,
  selectAttendances,
  selectIsLoading,
  subscribeAtendances,
  update,
} from '../redux/modules/attendances';

type Hooks = {
  attendances: Attendance[];
  isLoading: boolean;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleRemove: () => void;
};
export const useAttendances = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const attendance = useSelector(selectAttendance);
  const attendances = useSelector(selectAttendances);
  const isLoading = useSelector(selectIsLoading);

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!eventId || isAttendanceInvalid(attendance)) return;
    dispatch(create({ eventId, attendance }));
  };
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!eventId || isAttendanceInvalid(attendance)) return;
    dispatch(update({ eventId, attendance }));
  };
  const handleRemove = () => {
    dispatch(remove({ eventId, attendance }));
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('attendances')
      .doc(eventId)
      .collection('attendance')
      .onSnapshot((snapshot) => {
        const items: Attendance[] = [];
        snapshot.forEach((doc) => items.push(doc.data() as Attendance));
        dispatch(subscribeAtendances(items));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { attendances, isLoading, handleCreate, handleUpdate, handleRemove };
};
