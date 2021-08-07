import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/app/event';
import { UpdatePayload } from '../../redux/modules/domain/practice';

const db = getInstance();

export const createPractice = async (event: Event): Promise<void> => {
  const practice = {
    locations: event.dates.map((date) => ({ dateId: date.id })),
    plans: event.dates.map((date) => ({ dateId: date.id })),
    remarks: event.dates.map((date) => ({ dateId: date.id })),
  };
  await db.collection('practices').doc(event.id).set(practice);
};

export const updatePractice = async ({ event, practice }: UpdatePayload): Promise<void> => {
  await db.collection('practices').doc(event.id).set(practice, { merge: true });
};
