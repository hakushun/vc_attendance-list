import { useDispatch, useSelector } from 'react-redux';
import {
  selectPart,
  changePart,
  addPartForm,
  deletePartForm,
  Part,
  changeOrder,
  ChangeOrderPayload,
} from '../redux/modules/part';

type Hooks = {
  part: Part[];
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPartForm: () => void;
  handleDeletePartForm: () => void;
  handleChangeOrder: (_: ChangeOrderPayload) => void;
};
export const usePart = (): Hooks => {
  const dispatch = useDispatch();
  const part = useSelector(selectPart);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id.split('-')[1];
    dispatch(changePart({ id, name: e.target.value }));
  };

  const handleAddPartForm = () => {
    dispatch(addPartForm());
  };

  const handleDeletePartForm = () => {
    dispatch(deletePartForm());
  };

  const handleChangeOrder = ({ index, order }: ChangeOrderPayload) => {
    if (index === 0 && order < 0) return;
    if (index === part.length - 1 && order > 0) return;
    dispatch(changeOrder({ index, order }));
  };

  return { part, handleChange, handleAddPartForm, handleDeletePartForm, handleChangeOrder };
};
