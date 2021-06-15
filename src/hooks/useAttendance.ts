import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAttendance,
  changeAttendance,
  changeAttendanceItem,
  generateAttendance,
  AttendanceType,
} from '../redux/modules/attendance';
import { selectEvent } from '../redux/modules/event';
import { selectUser } from '../redux/modules/user';

export const useAttendance = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const event = useSelector(selectEvent);
  const attendance = useSelector(selectAttendance);

  const handleChangeAttendance = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(changeAttendance({ userId: user!.id, [e.target.name]: e.target.value }));
  };

  const handleChangeRemark = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateId = e.target.id.split('-')[1];
    dispatch(changeAttendanceItem({ dateId, remark: e.target.value }));
  };

  const handleClickRadio = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const type = e.currentTarget.id.split('-')[0] as AttendanceType;
    const dateId = e.currentTarget.id.split('-')[1];
    dispatch(changeAttendanceItem({ dateId, attendance: type }));
  };

  const handleKeyDownRadio = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    console.log(e);
  };
  useEffect(() => {
    const itmes = event.dates.map((date) => ({
      dateId: date.id,
      attendance: 'presence' as AttendanceType,
      remark: '',
    }));
    dispatch(generateAttendance(itmes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.id]);

  return {
    attendance,
    handleChangeAttendance,
    handleChangeRemark,
    handleClickRadio,
    handleKeyDownRadio,
  };
};
