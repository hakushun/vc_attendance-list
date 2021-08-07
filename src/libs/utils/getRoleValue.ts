import { RoleItem } from '../../redux/modules/app/role';

export const getRoleValue = (roles: RoleItem[], userId: string, programId: string): string => {
  const item = roles.find((role) => role.userId === userId);
  if (!item) return '未入力';
  const role = item[programId];
  if (!role) return '未入力';
  return role;
};
