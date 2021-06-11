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
  handleToggleEventFormWithInitiate: () => void;
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
    dispatch(toggleEventForm({ toggle: !eventFormIsShown, initiate: false }));
  };
  const handleToggleEventFormWithInitiate = () => {
    dispatch(toggleEventForm({ toggle: !eventFormIsShown, initiate: true }));
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
    handleToggleEventFormWithInitiate,
    handleToggleCovidForm,
    handleToggleAttendanceForm,
    handleToggleCovidResult,
    handleToggleSetting,
  };
};
