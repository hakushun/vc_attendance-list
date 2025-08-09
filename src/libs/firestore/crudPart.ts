import { doc, setDoc } from 'firebase/firestore';
import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/app/event';
import { generateId } from '../ulid/generateId';
import { UpdatePayload } from '../../redux/modules/domain/parts';

const db = getInstance();

const parts = ['Fl', 'Ob', 'Cl', 'Fg', 'Hr', 'Tp', 'Tb', 'Tuba', 'Perc', 'Vn', 'Va', 'Vc', 'Cb'];
const INITIAL_PART = parts.map((part) => ({ id: generateId(), name: part }));

export const createPart = async (event: Event): Promise<void> => {
  const docRef = doc(db, 'parts', event.id);
  await setDoc(docRef, { part: INITIAL_PART });
};

export const updatePart = async ({ event, part }: UpdatePayload): Promise<void> => {
  const docRef = doc(db, 'parts', event.id);
  await setDoc(docRef, { part }, { merge: true });
};
