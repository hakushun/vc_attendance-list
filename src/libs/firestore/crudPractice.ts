import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/event';
import { UpdatePayload } from '../../redux/modules/practice';

const db = getInstance();

// TODO: try/catch
export const createPractice = async (event: Event): Promise<void> => {
  const practice = {
    locations: event.dates.map((date) => ({ eventId: event.id, dateId: date.id })),
    plans: event.dates.map((date) => ({ eventId: event.id, dateId: date.id })),
    remarks: event.dates.map((date) => ({ eventId: event.id, dateId: date.id })),
  };
  await db.collection('practices').doc(event.id).set(practice);
};

export const updatePractice = async ({ event, practice }: UpdatePayload): Promise<void> => {
  await db.collection('practices').doc(event.id).set(practice, { merge: true });
};
