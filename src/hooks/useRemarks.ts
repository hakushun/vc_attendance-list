import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import type { Remark } from '../redux/modules/app/remarks';
import { changeRemark, selectRemarks } from '../redux/modules/app/remarks';

type Hooks = {
  remarks: Remark[];
  handleChangeRemarks: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
export const useRemarks = (): Hooks => {
  const dispatch = useAppDispatch();
  const remarks = useSelector(selectRemarks);

  const handleChangeRemarks = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const dateId = e.target.id.split('-')[1];
      dispatch(changeRemark({ dateId, [e.target.name]: e.target.value }));
    },
    [dispatch],
  );

  return { remarks, handleChangeRemarks };
};
