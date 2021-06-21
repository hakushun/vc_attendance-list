import { Part } from '../../redux/modules/part';

export const isPartInvalid = (parts: Part[]): boolean => {
  return parts.some((part) => part.name.trim() === '');
};
