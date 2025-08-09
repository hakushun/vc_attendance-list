import { doc, setDoc } from 'firebase/firestore';
import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/app/event';
import { UpdatePayload } from '../../redux/modules/domain/practice';

const db = getInstance();

export const createPractice = async (event: Event): Promise<void> => {
  await Promise.all(
    event.dates.map((date) => {
      const data = {
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
      const docRef = doc(db, 'practices', event.id, 'practice', date.id);
      return setDoc(docRef, data);
    }),
  );
};

export const updatePractice = async ({ event, practice }: UpdatePayload): Promise<void> => {
  await Promise.all(
    event.dates.map((date) => {
      const data = {
        location: practice.locations.find((location) => location.dateId === date.id),
        plan: practice.plans.find((plan) => plan.dateId === date.id),
        remark: practice.remarks.find((remark) => remark.dateId === date.id),
      };
      const docRef = doc(db, 'practices', event.id, 'practice', date.id);
      return setDoc(docRef, data, { merge: true });
    }),
  );
};
