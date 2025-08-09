import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';
import { getInstance } from '../libs/firestore/getInstance';
import { isAttendanceInvalid } from '../libs/utils/isAttendanceInvalid';
import { Attendance, selectAttendance } from '../redux/modules/app/attendance';
import {
  create,
  remove,
  selectAttendances,
  selectBreakdownAttendances,
  selectIsLoading,
  subscribeAtendances,
  update,
} from '../redux/modules/domain/attendances';
import { update as updateRoles } from '../redux/modules/domain/roles';
import { selectRole } from '../redux/modules/app/role';
import { selectUser } from '../redux/modules/app/user';

type Hooks = {
  attendances: Attendance[];
  isLoading: boolean;
  breakdownAttendances: {
    presence: Attendance[];
    late: Attendance[];
    leavingEarly: Attendance[];
    undecided: Attendance[];
    absence: Attendance[];
  };
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleRemove: () => void;
};
export const useAttendances = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);
  const attendance = useSelector(selectAttendance);
  const attendances = useSelector(selectAttendances);
  const isLoading = useSelector(selectIsLoading);
  const breakdownAttendances = useSelector(selectBreakdownAttendances);

  const handleCreate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!eventId || isAttendanceInvalid(attendance) || !user) return;
      dispatch(create({ eventId, attendance }));
      dispatch(updateRoles({ eventId, role, userId: user.id }));
    },
    [attendance, dispatch, eventId, role, user],
  );

  const handleUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!eventId || isAttendanceInvalid(attendance) || !user) return;
      dispatch(update({ eventId, attendance }));
      dispatch(updateRoles({ eventId, role, userId: user.id }));
    },
    [attendance, dispatch, eventId, role, user],
  );

  const handleRemove = useCallback(() => {
    dispatch(remove({ eventId, attendance }));
  }, [attendance, dispatch, eventId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'attendances', eventId, 'attendance'),
      (snapshot) => {
        const items: Attendance[] = [];
        snapshot.forEach((docSnapshot) => items.push(docSnapshot.data() as Attendance));
        dispatch(subscribeAtendances(items));
      },
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { attendances, isLoading, breakdownAttendances, handleCreate, handleUpdate, handleRemove };
};
