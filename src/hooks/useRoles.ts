import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { RoleItem } from '../redux/modules/app/role';
import { selectIsLoading, selectRoles, subscribeRoles } from '../redux/modules/domain/roles';

type Hooks = {
  roles: RoleItem[];
  isLoading: boolean;
};
export const useRoles = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const unsubscribe = db
      .collection('roles')
      .doc(eventId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as { [userId: string]: RoleItem } | undefined;
        if (!data) return;
        dispatch(subscribeRoles(data));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { roles, isLoading };
};
