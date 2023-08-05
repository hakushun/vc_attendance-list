import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRole, RoleItem, selectRole } from '../redux/modules/app/role';
import { selectUser } from '../redux/modules/app/user';

type Hooks = {
  role: RoleItem;
  handleChangeRole: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useRole = (): Hooks => {
  const dispatch = useDispatch();
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
