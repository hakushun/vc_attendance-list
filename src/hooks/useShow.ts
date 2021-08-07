import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateAttendance } from '../redux/modules/app/attendance';
import { initiateCovid } from '../redux/modules/app/covid';
import { selectEvent } from '../redux/modules/app/event';
import {
  selectEventFormIsShown,
  selectCovidFormIsShown,
  selectAttendanceFormIsShown,
  selectSettingIsShown,
  toggleEventForm,
  toggleSetting,
} from '../redux/modules/ui/show';

type Hooks = {
  eventFormIsShown: boolean;
  covidFormIsShown: boolean;
  attendanceFormIsShown: boolean;
  settingIsShown: boolean;
  handleToggleEventForm: () => void;
  handleToggleCovidForm: () => void;
  handleToggleAttendanceForm: () => void;
  handleToggleSetting: () => void;
};
export const useShow = (): Hooks => {
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const eventFormIsShown = useSelector(selectEventFormIsShown);
  const covidFormIsShown = useSelector(selectCovidFormIsShown);
  const attendanceFormIsShown = useSelector(selectAttendanceFormIsShown);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleToggleEventForm = useCallback(() => {
    dispatch(toggleEventForm());
  }, [dispatch]);
  const handleToggleCovidForm = useCallback(() => {
    dispatch(initiateCovid());
  }, [dispatch]);
  const handleToggleAttendanceForm = useCallback(() => {
    dispatch(initiateAttendance(event));
  }, [dispatch, event]);
  const handleToggleSetting = useCallback(() => {
    dispatch(toggleSetting(!settingIsShown));
  }, [dispatch, settingIsShown]);

  return {
    eventFormIsShown,
    covidFormIsShown,
    attendanceFormIsShown,
    settingIsShown,
    handleToggleEventForm,
    handleToggleCovidForm,
    handleToggleAttendanceForm,
    handleToggleSetting,
  };
};
