import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/event';
import { UpdatePayload } from '../../redux/modules/programs';

const db = getInstance();

export const createProgram = async (event: Event): Promise<void> => {
  try {
    await db.collection('programs').doc(event.id).set({ program: [] });
  } catch (err) {
    alert(err);
  }
};

export const updateProgram = async ({ event, program }: UpdatePayload): Promise<void> => {
  try {
    await db.collection('programs').doc(event.id).set({ program }, { merge: true });
  } catch (err) {
    alert(err);
  }
};
