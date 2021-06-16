import { Occupation } from '../../redux/modules/attendance';

export const convertOccuoation = (occupation: Occupation): string => {
  return occupation === 'working' ? '社会人' : '学生';
};
