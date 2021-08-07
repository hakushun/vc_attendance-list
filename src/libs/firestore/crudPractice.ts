import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/app/event';
import { UpdatePayload } from '../../redux/modules/domain/practice';

const db = getInstance();

export const createPractice = async (event: Event): Promise<void> => {
  Promise.all(
    event.dates.map((date) => {
      const project = {
        location: {
          name1: '',
          name2: '',
          url: '',
          dateId: date.id,
        },
        plan: {
          category: '',
          schedule: '',
          dateId: date.id,
        },
        remark: {
          content: '',
          dateId: date.id,
        },
      };
      return db
        .collection('practices')
        .doc(event.id)
        .collection('practice')
        .doc(date.id)
        .set(project);
    }),
  );
};

export const updatePractice = async ({ event, practice }: UpdatePayload): Promise<void> => {
  await db.collection('practices').doc(event.id).set(practice, { merge: true });
};

