import { AttendanceType } from '../../redux/modules/attendance';

export const convertAttendance = (type: AttendanceType): string => {
  switch (type) {
    case 'presence':
      return '○';
    case 'undecided':
      return '△';
    case 'absence':
      return '×';
    default:
      return '';
  }
};
