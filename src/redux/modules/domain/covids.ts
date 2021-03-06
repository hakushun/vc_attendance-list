import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { createCovid, fetchCovid } from '../../../libs/firestore/curdCovid';
import { Attendance } from '../app/attendance';
import { Covid } from '../app/covid';
import { RootState } from '../reducers';

type Covids = {
  covids: Covid[];
  isLoading: boolean;
  selectedDateId: string;
};
export type FetchPayload = {
  eventId: string;
  dateId: string;
};
export type CreatePayload = {
  eventId: string;
  covid: Covid;
};
interface CustomError extends Error {
  code: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Covids>(actionCreator);

export const fetch = asyncActionCreator<FetchPayload, Covid[], CustomError>(
  'FETCH_COVID',
  async (payload) => {
    const result = await fetchCovid(payload);
    return result;
  },
);
export const create = asyncActionCreator<CreatePayload, void, CustomError>(
  'CREATE_COVID',
  async (payload) => {
    await createCovid(payload);
  },
);
// initial state
const INITIAL_STATE: Covids = {
  covids: [],
  isLoading: false,
  selectedDateId: '',
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(fetch.async.started, (state, payload) => ({
    ...state,
    isLoading: true,
    selectedDateId: payload.dateId,
  }))
  .case(fetch.async.done, (state, { result }) => ({
    ...state,
    covids: result,
    isLoading: false,
  }))
  .case(fetch.async.failed, (state) => ({
    ...state,
    isLoading: false,
  }))
  .case(create.async.started, (state) => ({
    ...state,
    isLoading: true,
  }))
  .case(create.async.done, (state) => ({
    ...state,
    isLoading: false,
  }))
  .case(create.async.failed, (state) => ({
    ...state,
    isLoading: false,
  }));
export default reducer;

// selector
export const selectCovids = createSelector(
  [(state: RootState) => state.domain.covids.covids],
  (covids) => covids,
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.domain.covids.isLoading],
  (isLoading) => isLoading,
);
export const selectAnswerResult = createSelector(
  [
    (state: RootState) => state.domain.covids.covids,
    (state: RootState) => state.domain.attendances.attendances,
  ],
  (covids, attendances) =>
    covids.map((covid) => ({
      ...covid,
      part: attendances.find((attendance) => attendance.userId === covid.userId)?.part,
      name: attendances.find((attendance) => attendance.userId === covid.userId)?.name,
    })),
);
export const selectUnansweredUsers = createSelector(
  [
    (state: RootState) => state.domain.covids.covids,
    (state: RootState) => state.domain.covids.selectedDateId,
    (state: RootState) => state.domain.attendances.attendances,
    (state: RootState) => state.domain.parts.parts,
  ],
  (covids, selectedDateId, attendances, parts) =>
    parts.reduce<Attendance[]>((acc, current) => {
      const filtered = attendances.filter(
        (attendance) =>
          current.name === attendance.part &&
          attendance.attendances.find(
            (att) => att.dateId === selectedDateId && att.attendance !== 'absence',
          ) &&
          !covids.some((covid) => covid.userId === attendance.userId),
      );
      acc.push(...filtered);
      return acc;
    }, []),
);
