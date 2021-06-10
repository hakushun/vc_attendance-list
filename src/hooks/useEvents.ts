import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { Event, selectEvent } from '../redux/modules/event';
import {
  createEvent,
  selectEvents,
  selectIsLoading,
  subscribeEvents,
} from '../redux/modules/events';

type Hooks = {
  events: Event[];
  isLoading: boolean;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const useEvents = (): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const events = useSelector(selectEvents);
  const isLoading = useSelector(selectIsLoading);

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // TODO: validation
    if (
      !event.title ||
      event.dates.some((date) => date.day === 'NaN-aN-aN') ||
      event.dates.some((date) => date.time === '')
    )
      return;
    dispatch(createEvent(event));
  };

  useEffect(() => {
    const unsubscribe = db.collection('events').onSnapshot((snapshot) => {
      const items: Event[] = [];
      snapshot.forEach((doc) => items.push(doc.data() as Event));
      dispatch(subscribeEvents(items));
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { events, isLoading, handleCreate };
};
