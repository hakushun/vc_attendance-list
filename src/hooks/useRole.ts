import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import type { RoleItem } from '../redux/modules/app/role';
import { changeRole, selectRole } from '../redux/modules/app/role';
import { selectUser } from '../redux/modules/app/user';

type Hooks = {
  role: RoleItem;
  handleChangeRole: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useRole = (): Hooks => {
  const dispatch = useAppDispatch();
  const role = useSelector(selectRole);
  const user = useSelector(selectUser);

  const handleChangeRole = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!user) return;
      const programId = e.target.id;
      dispatch(changeRole({ userId: user.id, [programId]: e.target.value }));
    },
    [dispatch, user],
  );

  return { role, handleChangeRole };
};
