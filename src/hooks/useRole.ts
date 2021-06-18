import { useDispatch, useSelector } from 'react-redux';
import {
  changeRadio,
  changeRole,
  RoleItem,
  selectProgramId,
  selectRoles,
} from '../redux/modules/role';

type Hooks = {
  programId: string;
  roles: RoleItem[];
  handleChangeRadio: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeRole: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useRole = (): Hooks => {
  const dispatch = useDispatch();
  const programId = useSelector(selectProgramId);
  const roles = useSelector(selectRoles);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeRadio({ programId: e.target.value }));
  };

  const handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userId = e.target.id.split('-')[1];
    dispatch(changeRole({ userId, [programId]: e.target.value }));
  };

  return { programId, roles, handleChangeRadio, handleChangeRole };
};
