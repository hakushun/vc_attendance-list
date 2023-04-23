import { AttendanceType } from '../../redux/modules/app/attendance';

export const convertAttendance = (type: AttendanceType): string => {
  switch (type) {
    case 'presence':
      return '○';
    case 'late':
      return '遅刻';
    case 'leavingEarly':
      return '早退';
    case 'undecided':
      return '未定';
    case 'absence':
      return '×';
    default:
      return '';
  }
};
