import { Event } from '../../redux/modules/event';
import { UpdatePayload } from '../../redux/modules/roles';
import { getInstance } from './getInstance';

const db = getInstance();

export const createRole = async (event: Event): Promise<void> => {
  try {
    await db.collection('roles').doc(event.id).set({ roles: [] });
  } catch (err) {
    alert(err);
  }
};

export const updateRole = async ({ eventId, roles }: UpdatePayload): Promise<void> => {
  try {
    await db.collection('roles').doc(eventId).set({ roles }, { merge: true });
  } catch (err) {
    alert(err);
  }
};
