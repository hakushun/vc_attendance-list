import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getStringDate } from '../../libs/dayjs/getStringDate';
import { generateId } from '../../libs/ulid/generateId';
import { createEvent } from './events';
import { RootState } from './reducers';
import { toggleEventForm } from './show';

export type Date = {
  id: string;
  day: string;
  time: string;
};
export type Event = {
  id?: string;
  title: string;
  detail: string;
  dates: Date[];
};
type ChangeTextPayload = {
  [s: string]: string;
};
type ChangeDayPayload = {
  index: number;
  day: string;
};
type ChangeTimePayload = {
  index: number;
  time: string;
};
// action
const actionCreator = actionCreatorFactory();

export const changeText = actionCreator<ChangeTextPayload>('CHANGE_TEXT');
export const changeDay = actionCreator<ChangeDayPayload>('CHANGE_DAY');
export const changeTime = actionCreator<ChangeTimePayload>('CHANGE_TIME');
export const addDateForm = actionCreator('ADD_DATE_FORM');
export const deleteDateForm = actionCreator('DELETE_DATE_FORM');
export const initiateEvent = actionCreator('INITIATE_EVENT');

const generateNewDate = (): Date => ({
  id: generateId(),
  day: getStringDate(),
  time: '13:00~17:00',
});
// initial state
const INITIAL_STATE: Event = {
  title: '',
  detail: '',
  dates: [generateNewDate()],
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(changeText, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(changeDay, (state, payload) => ({
    ...state,
    dates: state.dates.map((date, index) =>
      index === payload.index ? { ...date, day: payload.day } : date,
    ),
  }))
  .case(changeTime, (state, payload) => ({
    ...state,
    dates: state.dates.map((date, index) =>
      index === payload.index ? { ...date, time: payload.time } : date,
    ),
  }))
  .case(addDateForm, (state) => ({
    ...state,
    dates: state.dates.length < 31 ? [...state.dates, generateNewDate()] : [...state.dates],
  }))
  .case(deleteDateForm, (state) => ({
    ...state,
    dates:
      state.dates.length === 1 ? state.dates : [...state.dates].slice(0, state.dates.length - 1),
  }))
  .case(initiateEvent, () => ({
    ...INITIAL_STATE,
    dates: [generateNewDate()],
  }))
  .case(createEvent.async.done, (state, { result }) => ({
    ...state,
    ...result,
  }))
  .case(toggleEventForm, (state, payload) => {
    if (payload.initiate) {
      return {
        ...INITIAL_STATE,
        dates: [generateNewDate()],
      };
    }
    if (state.id) {
      return { ...state };
    }
    return {
      ...INITIAL_STATE,
      dates: [generateNewDate()],
    };
  });
export default reducer;

// selector
export const selectEvent = createSelector(
  [(state: RootState) => state.app.event],
  (event) => event,
);
export const selectTitle = createSelector(
  [(state: RootState) => state.app.event.title],
  (title) => title,
);
export const selectDetail = createSelector(
  [(state: RootState) => state.app.event.detail],
  (detail) => detail,
);
export const selectDates = createSelector(
  [(state: RootState) => state.app.event.dates],
  (dates) => dates,
);
