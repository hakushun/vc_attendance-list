import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { RoleItem, selectRole } from '../redux/modules/role';
import { selectIsLoading, selectRoles, subscribeRoles, update } from '../redux/modules/roles';

type Hooks = {
  roles: RoleItem[];
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const useRoles = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const roles = useSelector(selectRoles);
  const isLoading = useSelector(selectIsLoading);

  const handleUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(update({ eventId, roles: role }));
    },
    [dispatch, eventId, role],
  );

  useEffect(() => {
    const unsubscribe = db
      .collection('roles')
      .doc(eventId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as { roles: RoleItem[] } | undefined;
        data && dispatch(subscribeRoles(data.roles));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { roles, isLoading, handleUpdate };
};
