import { createSelector } from 'reselect';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { RootState } from './reducers';
import { Event, Date } from './event';
import { createBook } from '../../libs/firestore/crudEvent';

export type Events = {
  events: Event[];
  isLoading: boolean;
};
export type CreatePayload = {
  title: string;
  detail: string;
  dates: Date[];
};
interface CustomError extends Error {
  name: string;
  message: string;
}
// action
const actionCreator = actionCreatorFactory();
const asyncActionCreator = asyncFactory<Events>(actionCreator);

export const subscribeEvents = actionCreator<Event[]>('SUBSCRIBE_EVENTS');
export const createEvent = asyncActionCreator<CreatePayload, Event, CustomError>(
  'CREATE_EVENT',
  async (payload) => {
    const result = await createBook(payload);
    return result;
  },
);

// initial state
const INITIAL_STATE: Events = {
  events: [],
  isLoading: false,
};

// reducer
const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(subscribeEvents, (state, payload) => ({
    ...state,
    events: payload,
  }))
  .case(createEvent.async.started, (state) => ({
    ...state,
    isLoading: true,
  }))
  .case(createEvent.async.done, (state) => ({
    ...state,
    isLoading: false,
  }))
  .case(createEvent.async.failed, (state) => ({
    ...state,
    isLoading: false,
  }));
export default reducer;

// selector
export const selectEvents = createSelector(
  [(state: RootState) => state.domain.events.events],
  (events) => events,
);
export const selectIsLoading = createSelector(
  [(state: RootState) => state.domain.events.isLoading],
  (isLoading) => isLoading,
);
