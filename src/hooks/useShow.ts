import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateAttendance } from '../redux/modules/app/attendance';
import { initiateCovid } from '../redux/modules/app/covid';
import { focusEvent, selectEvent } from '../redux/modules/app/event';
import { selectEvents } from '../redux/modules/domain/events';
import {
  selectEventFormIsShown,
  selectCovidFormIsShown,
  selectAttendanceFormIsShown,
  selectSettingIsShown,
  toggleEventForm,
  toggleSetting,
} from '../redux/modules/ui/show';

type Hooks = {
  attendanceRef: MutableRefObject<HTMLHeadingElement | null>;
  covidRef: MutableRefObject<HTMLHeadingElement | null>;
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
  const attendanceRef = useRef<HTMLHeadingElement | null>(null);
  const covidRef = useRef<HTMLHeadingElement | null>(null);
  const event = useSelector(selectEvent);
  const events = useSelector(selectEvents);
  const eventFormIsShown = useSelector(selectEventFormIsShown);
  const covidFormIsShown = useSelector(selectCovidFormIsShown);
  const attendanceFormIsShown = useSelector(selectAttendanceFormIsShown);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleToggleEventForm = useCallback(() => {
    event.id && dispatch(focusEvent(events.find((item) => item.id === event.id)!));
    dispatch(toggleEventForm());
  }, [dispatch, events, event]);
  const handleToggleCovidForm = useCallback(() => {
    dispatch(initiateCovid());
  }, [dispatch]);
  const handleToggleAttendanceForm = useCallback(() => {
    dispatch(initiateAttendance(event));
  }, [dispatch, event]);
  const handleToggleSetting = useCallback(() => {
    dispatch(toggleSetting(!settingIsShown));
  }, [dispatch, settingIsShown]);

  useEffect(() => {
    if (attendanceFormIsShown) {
      attendanceRef.current?.focus();
    }
  }, [attendanceFormIsShown]);
  useEffect(() => {
    if (covidFormIsShown) {
      covidRef.current?.focus();
    }
  }, [covidFormIsShown]);
  return {
    attendanceRef,
    covidRef,
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
