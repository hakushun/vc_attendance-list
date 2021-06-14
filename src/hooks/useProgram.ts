import { useDispatch, useSelector } from 'react-redux';
import {
  addProgramForm,
  changeProgram,
  deleteProgramForm,
  Program,
  selectProgram,
} from '../redux/modules/program';

type Hooks = {
  program: Program[];
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddProgramForm: () => void;
  handleDeleteProgramForm: () => void;
};
export const useProgram = (): Hooks => {
  const dispatch = useDispatch();
  const program = useSelector(selectProgram);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id.split('-')[1];
    dispatch(changeProgram({ id, name: e.target.value }));
  };

  const handleAddProgramForm = () => {
    dispatch(addProgramForm());
  };

  const handleDeleteProgramForm = () => {
    dispatch(deleteProgramForm());
  };

  return { program, handleChange, handleAddProgramForm, handleDeleteProgramForm };
};
