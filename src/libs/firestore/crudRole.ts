import { Event } from '../../redux/modules/app/event';
import { UpdatePayload } from '../../redux/modules/domain/roles';
import { getInstance } from './getInstance';

const db = getInstance();

export const createRole = async (event: Event): Promise<void> => {
  await db.collection('roles').doc(event.id).set({});
};

export const updateRole = async ({ eventId, userId, role }: UpdatePayload): Promise<void> => {
  await db
    .collection('roles')
    .doc(eventId)
    .set({ [userId]: role }, { merge: true });
};
