import { useDispatch, useSelector } from 'react-redux';
import {
  selectEventFormIsShown,
  selectCovidFormIsShown,
  selectAttendanceFormIsShown,
  selectCovidResultIsShown,
  selectSettingIsShown,
  toggle,
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
    dispatch(toggle({ eventForm: !eventFormIsShown }));
  };
  const handleToggleCovidForm = () => {
    dispatch(toggle({ covidForm: !covidFormIsShown }));
  };
  const handleToggleAttendanceForm = () => {
    dispatch(toggle({ attendanceForm: !attendanceFormIsShown }));
  };
  const handleToggleCovidResult = () => {
    dispatch(toggle({ covidResult: !covidResultIsShown }));
  };
  const handleToggleSetting = () => {
    dispatch(toggle({ setting: !settingIsShown }));
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
