import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import type { ProgramItem } from '../redux/modules/app/program';
import {
  addProgramForm,
  changeProgram,
  deleteProgramForm,
  focusProgram,
  selectProgram,
  selectSelectedId,
} from '../redux/modules/app/program';

type Hooks = {
  program: ProgramItem[];
  selectedId: string;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddProgramForm: () => void;
  handleDeleteProgramForm: () => void;
  handleFocusProgram: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const useProgram = (): Hooks => {
  const dispatch = useAppDispatch();
  const program = useSelector(selectProgram);
  const selectedId = useSelector(selectSelectedId);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = e.target.id.split('-')[1];
      dispatch(changeProgram({ id, name: e.target.value }));
    },
    [dispatch],
  );

  const handleAddProgramForm = useCallback(() => {
    dispatch(addProgramForm());
  }, [dispatch]);

  const handleDeleteProgramForm = useCallback(() => {
    dispatch(deleteProgramForm());
  }, [dispatch]);

  const handleFocusProgram = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(focusProgram(e.target.value));
    },
    [dispatch],
  );

  return {
    program,
    selectedId,
    handleChange,
    handleAddProgramForm,
    handleDeleteProgramForm,
    handleFocusProgram,
  };
};
