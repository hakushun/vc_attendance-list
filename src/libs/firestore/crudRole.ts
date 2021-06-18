import { UpdatePayload } from '../../redux/modules/roles';
import { getInstance } from './getInstance';

const db = getInstance();

// TODO: try/catch
export const createRole = async (eventId: string): Promise<void> => {
  await db.collection('roles').doc(eventId).set({ roles: [] });
};

export const updateRole = async ({ eventId, roles }: UpdatePayload): Promise<void> => {
  await db.collection('roles').doc(eventId).set({ roles }, { merge: true });
};
