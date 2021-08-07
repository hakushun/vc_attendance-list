import { Event } from '../../redux/modules/app/event';
import { CreatePayload } from '../../redux/modules/domain/events';
import { getInstance } from './getInstance';

const db = getInstance();

export const fetchEvent = async (id: string): Promise<Event> => {
  const doc = await db.collection('events').doc(id).get();
  return doc.data() as Event;
};

export const createEvent = async (event: CreatePayload): Promise<Event> => {
  const id = await db.collection('events').doc().id;
  await db
    .collection('events')
    .doc(id)
    .set({ ...event, id });
  return fetchEvent(id);
};

export const updateEvent = async (event: Event): Promise<Event> => {
  await db.collection('events').doc(event.id).set(event, { merge: true });
  return fetchEvent(event.id!);
};

export const removeEvent = async (event: Event): Promise<void> => {
  await db.collection('events').doc(event.id).delete();
  await db.collection('parts').doc(event.id).delete();
  await db.collection('practices').doc(event.id).delete();
  await db.collection('programs').doc(event.id).delete();
  await db.collection('roles').doc(event.id).delete();
};
