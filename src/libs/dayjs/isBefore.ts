import dayjs from 'dayjs';

export const isBefore = (date1: string): boolean => {
  return dayjs(date1).isBefore(dayjs(), 'day');
};
