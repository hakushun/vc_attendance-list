import { useDispatch, useSelector } from 'react-redux';
import { initiateAttendance } from '../redux/modules/attendance';
import { selectEvent } from '../redux/modules/event';
import { selectEvents } from '../redux/modules/events';
import {
  selectEventFormIsShown,
  selectCovidFormIsShown,
  selectAttendanceFormIsShown,
  selectCovidResultIsShown,
  selectSettingIsShown,
  toggleEventForm,
  toggleCovidForm,
  toggleCovidResult,
  toggleSetting,
} from '../redux/modules/show';

type Hooks = {
  eventFormIsShown: boolean;
  covidFormIsShown: boolean;
  attendanceFormIsShown: boolean;
  covidResultIsShown: boolean;
  settingIsShown: boolean;
  handleToggleEventForm: () => void;
  handleToggleEventFormWithInitiate: () => void;
  handleToggleCovidForm: () => void;
  handleToggleAttendanceForm: () => void;
  handleToggleCovidResult: () => void;
  handleToggleSetting: () => void;
};
export const useShow = (): Hooks => {
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const events = useSelector(selectEvents);
  const eventFormIsShown = useSelector(selectEventFormIsShown);
  const covidFormIsShown = useSelector(selectCovidFormIsShown);
  const attendanceFormIsShown = useSelector(selectAttendanceFormIsShown);
  const covidResultIsShown = useSelector(selectCovidResultIsShown);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleToggleEventForm = () => {
    if (event.id) {
      const target = events.find((item) => item.id === event.id);
      target && dispatch(toggleEventForm(target));
      return;
    }
    dispatch(toggleEventForm());
  };
  const handleToggleEventFormWithInitiate = () => {
    dispatch(toggleEventForm());
  };
  const handleToggleCovidForm = () => {
    dispatch(toggleCovidForm(!covidFormIsShown));
  };
  const handleToggleAttendanceForm = () => {
    dispatch(initiateAttendance(event));
  };
  const handleToggleCovidResult = () => {
    dispatch(toggleCovidResult(!covidResultIsShown));
  };
  const handleToggleSetting = () => {
    dispatch(toggleSetting(!settingIsShown));
  };

  return {
    eventFormIsShown,
    covidFormIsShown,
    attendanceFormIsShown,
    covidResultIsShown,
    settingIsShown,
    handleToggleEventForm,
    handleToggleEventFormWithInitiate,
    handleToggleCovidForm,
    handleToggleAttendanceForm,
    handleToggleCovidResult,
    handleToggleSetting,
  };
};
