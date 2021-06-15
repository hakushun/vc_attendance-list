import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { RootState } from './reducers';

export type AttendanceType = 'presence' | 'undecided' | 'absence';
type AttendanceItem = {
  dateId: string;
  attendance: AttendanceType;
  remark: string;
};
type Occupation = 'student' | 'working';
export type Attendance = {
  userId: string;
  occupation: Occupation;
  name: string;
  part: string;
  attendances: AttendanceItem[];
  comment: string;
};
type ChangeAttendancePayload = {
  userId: string;
} & Partial<Attendance>;
type ChangeAttendanceItemPayload = {
  dateId: string;
} & Partial<AttendanceItem>;
// action
const actionCreator = actionCreatorFactory();

export const generateAttendance = actionCreator<AttendanceItem[]>('GENERATE_ATTENDANCE');
export const changeAttendance = actionCreator<ChangeAttendancePayload>('CHANGE_ATTENDANCE');
export const changeAttendanceItem =
  actionCreator<ChangeAttendanceItemPayload>('CHANGE_ATTENDANCE_ITEM');

// initial state
const INITIAL_STATE: Attendance = {
  userId: '',
  occupation: 'working',
  name: '',
  part: '',
  attendances: [],
  comment: '',
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(generateAttendance, (state, payload) => ({
    ...state,
    attendances: payload,
  }))
  .case(changeAttendance, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(changeAttendanceItem, (state, payload) => ({
    ...state,
    attendances: [
      ...state.attendances.map((attend) =>
        attend.dateId === payload.dateId ? { ...attend, ...payload } : attend,
      ),
    ],
  }));
export default reducer;

// selector
export const selectAttendance = createSelector(
  [(state: RootState) => state.app.attendance],
  (attendance) => attendance,
);
