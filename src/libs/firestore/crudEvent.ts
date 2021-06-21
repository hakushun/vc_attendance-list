import { Event } from '../../redux/modules/event';
import { CreatePayload } from '../../redux/modules/events';
import { getInstance } from './getInstance';

const db = getInstance();

export const fetchEvent = async (id: string): Promise<Event | null> => {
  try {
    const doc = await db.collection('events').doc(id).get();
    return doc.data() as Event;
  } catch (err) {
    alert(err);
    return null;
  }
};

export const createEvent = async (event: CreatePayload): Promise<Event | null> => {
  try {
    const id = await db.collection('events').doc().id;
    await db
      .collection('events')
      .doc(id)
      .set({ ...event, id });
    return fetchEvent(id);
  } catch (err) {
    alert(err);
    return null;
  }
};

export const updateEvent = async (event: Event): Promise<Event | null> => {
  try {
    await db.collection('events').doc(event.id).set(event, { merge: true });
    return fetchEvent(event.id!);
  } catch (err) {
    alert(err);
    return null;
  }
};

export const removeEvent = async (event: Event): Promise<void> => {
  try {
    await db.collection('events').doc(event.id).delete();
  } catch (err) {
    alert(err);
  }
  // TODO: eventに紐づいたdataもdeleteする
};
