import { superusers } from '../../config/superusers';
import { Userdata } from '../../redux/modules/user';

export const isSuperuser = (user: Userdata): boolean => {
  return superusers.some((su) => su === user?.id);
};
