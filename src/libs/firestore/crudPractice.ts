import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/event';
import { UpdatePayload } from '../../redux/modules/practice';

const db = getInstance();

export const createPractice = async (event: Event): Promise<void> => {
  const practice = {
    locations: event.dates.map((date) => ({ eventId: event.id, dateId: date.id })),
    plans: event.dates.map((date) => ({ eventId: event.id, dateId: date.id })),
    remarks: event.dates.map((date) => ({ eventId: event.id, dateId: date.id })),
  };
  try {
    await db.collection('practices').doc(event.id).set(practice);
  } catch (err) {
    alert(err);
  }
};

export const updatePractice = async ({ event, practice }: UpdatePayload): Promise<void> => {
  try {
    await db.collection('practices').doc(event.id).set(practice, { merge: true });
  } catch (err) {
    alert(err);
  }
};
