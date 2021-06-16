import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/event';
import { generateId } from '../ulid/generateId';

const db = getInstance();

const parts = [
  '指揮者',
  'Fl',
  'Ob',
  'Cl',
  'Fg',
  'Hr',
  'Tp',
  'Tb',
  'Tuba',
  'Perc',
  'Vn',
  'Va',
  'Vc',
  'Cb',
];
const INITIAL_PART = parts.map((part) => ({ id: generateId(), name: part }));

export const createPart = async (event: Event): Promise<void> => {
  await db.collection('parts').doc(event.id).set({ part: INITIAL_PART });
};

export const updatePart = async ({ event, part }: UpdatePayload): Promise<void> => {
  await db.collection('parts').doc(event.id).set({ part }, { merge: true });
};