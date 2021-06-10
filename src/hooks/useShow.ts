import { useDispatch, useSelector } from 'react-redux';
import {
  selectEventFormIsShown,
  selectCovidFormIsShown,
  selectAttendanceFormIsShown,
  selectCovidResultIsShown,
  selectSettingIsShown,
  toggleEventForm,
  toggleAttendanceForm,
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
  const eventFormIsShown = useSelector(selectEventFormIsShown);
  const covidFormIsShown = useSelector(selectCovidFormIsShown);
  const attendanceFormIsShown = useSelector(selectAttendanceFormIsShown);
  const covidResultIsShown = useSelector(selectCovidResultIsShown);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleToggleEventForm = () => {
    dispatch(toggleEventForm(!eventFormIsShown));
  };
  const handleToggleCovidForm = () => {
    dispatch(toggleCovidForm(!covidFormIsShown));
  };
  const handleToggleAttendanceForm = () => {
    dispatch(toggleAttendanceForm(!attendanceFormIsShown));
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
