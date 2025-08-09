import { doc, setDoc } from 'firebase/firestore';
import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/app/event';
import { UpdatePayload } from '../../redux/modules/domain/programs';

const db = getInstance();

export const createProgram = async (event: Event): Promise<void> => {
  const docRef = doc(db, 'programs', event.id);
  await setDoc(docRef, { program: [] });
};

export const updateProgram = async ({ event, program }: UpdatePayload): Promise<void> => {
  const docRef = doc(db, 'programs', event.id);
  await setDoc(docRef, { program }, { merge: true });
};
