import { ProgramItem } from '../../redux/modules/program';

export const isProgramInvalid = (programs: ProgramItem[]): boolean => {
  return programs.some((program) => program.name.trim() === '');
};
