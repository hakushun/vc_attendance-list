import { useDispatch, useSelector } from 'react-redux';
import { initiateAttendance } from '../redux/modules/attendance';
import { selectEvent } from '../redux/modules/event';
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
  handleToggleCovidForm: () => void;
  handleToggleAttendanceForm: () => void;
  handleToggleCovidResult: () => void;
  handleToggleSetting: () => void;
};
export const useShow = (): Hooks => {
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const eventFormIsShown = useSelector(selectEventFormIsShown);
  const covidFormIsShown = useSelector(selectCovidFormIsShown);
  const attendanceFormIsShown = useSelector(selectAttendanceFormIsShown);
  const covidResultIsShown = useSelector(selectCovidResultIsShown);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleToggleEventForm = () => {
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
    handleToggleCovidForm,
    handleToggleAttendanceForm,
    handleToggleCovidResult,
    handleToggleSetting,
  };
};
