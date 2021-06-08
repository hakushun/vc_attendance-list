import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

type KeyName = 'eventForm' | 'covidForm' | 'attendanceForm' | 'covidResult' | 'setting';
export type Show = Record<KeyName, boolean>;
export type TogglePayload = Partial<Show>;

// action
const actionCreator = actionCreatorFactory();
export const toggle = actionCreator<TogglePayload>('TOGGLE_SHOW');

// initial state
const INITIAL_STATE: Show = {
  eventForm: false,
  covidForm: false,
  attendanceForm: false,
  covidResult: false,
  setting: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE).case(toggle, (state, payload) => ({
  ...state,
  ...payload,
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
