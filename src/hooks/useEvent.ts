import { useDispatch, useSelector } from 'react-redux';
import { getStringDate } from '../libs/dayjs/getStringDate';
import {
  addDateForm,
  changeDay,
  changeText,
  changeTime,
  deleteDateForm,
  selectDates,
  selectDetail,
  selectTitle,
} from '../redux/modules/event';

type Hooks = {
  eventTitle: string;
  eventDetail: string;
  eventDates: Date[];
  handleChangeText: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCangeDay: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCangeTime: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddDateForm: () => void;
  handleDeleteDateForm: () => void;
};
export const useEvent = (): Hooks => {
  const dispatch = useDispatch();
  const eventTitle = useSelector(selectTitle);
  const eventDetail = useSelector(selectDetail);
  const eventDates = useSelector(selectDates);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeText({ [e.target.name]: e.target.value }));
  };

  const handleCangeDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.id.split('-')[1], 10);
    dispatch(changeDay({ index, day: getStringDate(e.target.value) }));
  };

  const handleCangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.id.split('-')[1], 10);
    dispatch(changeTime({ index, time: e.target.value }));
  };

  const handleAddDateForm = () => {
    dispatch(addDateForm());
  };

  const handleDeleteDateForm = () => {
    dispatch(deleteDateForm());
  };

  return {
    eventTitle,
    eventDetail,
    eventDates,
    handleChangeText,
    handleCangeDay,
    handleCangeTime,
    handleAddDateForm,
    handleDeleteDateForm,
  };
};
