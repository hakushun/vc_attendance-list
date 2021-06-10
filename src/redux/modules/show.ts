import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

type KeyName = 'eventForm' | 'covidForm' | 'attendanceForm' | 'covidResult' | 'setting';
export type Show = Record<KeyName, boolean>;
export type TogglePayload = Partial<Show>;

// action
const actionCreator = actionCreatorFactory();
export const toggleEventForm = actionCreator<boolean>('TOGGLE_EVENT_FORM');
export const toggleCovidForm = actionCreator<boolean>('TOGGLE_COVID_FORM');
export const toggleAttendanceForm = actionCreator<boolean>('TOGGLE_ATTENDANCE_FORM');
export const toggleCovidResult = actionCreator<boolean>('TOGGLE_COVID_RESULT');
export const toggleSetting = actionCreator<boolean>('TOGGLE_SETTING');

// initial state
const INITIAL_STATE: Show = {
  eventForm: false,
  covidForm: false,
  attendanceForm: false,
  covidResult: false,
  setting: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(toggleEventForm, (state, payload) => ({
    ...state,
    eventForm: payload,
  }))
  .case(toggleCovidForm, (state, payload) => ({
    ...state,
    covidForm: payload,
  }))
  .case(toggleAttendanceForm, (state, payload) => ({
    ...state,
    attendanceForm: payload,
  }))
  .case(toggleCovidResult, (state, payload) => ({
    ...state,
    covidResult: payload,
  }))
  .case(toggleSetting, (state, payload) => ({
    ...state,
    setting: payload,
  }));
export default reducer;

// selector
export const selectEventFormIsShown = createSelector(
  [(state: RootState) => state.ui.show.eventForm],
  (eventForm) => eventForm,
);
export const selectCovidFormIsShown = createSelector(
  [(state: RootState) => state.ui.show.covidForm],
  (covidForm) => covidForm,
);
export const selectAttendanceFormIsShown = createSelector(
  [(state: RootState) => state.ui.show.attendanceForm],
  (attendanceForm) => attendanceForm,
);
export const selectCovidResultIsShown = createSelector(
  [(state: RootState) => state.ui.show.covidResult],
  (covidResult) => covidResult,
);
export const selectSettingIsShown = createSelector(
  [(state: RootState) => state.ui.show.setting],
  (setting) => setting,
);
