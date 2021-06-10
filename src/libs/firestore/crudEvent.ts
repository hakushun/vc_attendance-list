import { Event } from '../../redux/modules/event';
import { CreatePayload } from '../../redux/modules/events';
import { getInstance } from './getInstance';

const db = getInstance();

export const fetchEvent = async (id: string): Promise<Event> => {
  const doc = await db.collection('events').doc(id).get();
  return doc.data() as Event;
};

export const createBook = async (event: CreatePayload): Promise<Event> => {
  const id = await db.collection('events').doc().id;
  await db
    .collection('events')
    .doc(id)
    .set({ ...event, id });
  return fetchEvent(id);
};
