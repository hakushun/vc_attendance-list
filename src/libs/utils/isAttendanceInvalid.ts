import { Attendance } from '../../redux/modules/attendance';

export const isAttendanceInvalid = (attendance: Attendance): boolean => {
  return (
    attendance.name.trim() === '' ||
    attendance.part === '' ||
    attendance.occupation === '' ||
    !attendance.userId
  );
};
