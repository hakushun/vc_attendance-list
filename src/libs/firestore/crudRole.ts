import { doc, setDoc } from 'firebase/firestore';
import { Event } from '../../redux/modules/app/event';
import { UpdatePayload } from '../../redux/modules/domain/roles';
import { getInstance } from './getInstance';

const db = getInstance();

export const createRole = async (event: Event): Promise<void> => {
  const docRef = doc(db, 'roles', event.id);
  await setDoc(docRef, {});
};

export const updateRole = async ({ eventId, userId, role }: UpdatePayload): Promise<void> => {
  const docRef = doc(db, 'roles', eventId);
  await setDoc(docRef, { [userId]: role }, { merge: true });
};

export const removeRole = async ({
  eventId,
  userId,
}: {
  eventId: string;
  userId: string;
}): Promise<void> => {
  const docRef = doc(db, 'roles', eventId);
  await setDoc(docRef, { [userId]: {} }, { merge: true });
};
