import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import type { Plan } from '../redux/modules/app/plans';
import { changePlan, selectPlans } from '../redux/modules/app/plans';

type Hooks = {
  plans: Plan[];
  handleChangePlans: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
export const usePlans = (): Hooks => {
  const dispatch = useAppDispatch();
  const plans = useSelector(selectPlans);

  const handleChangePlans = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const dateId = e.target.id.split('-')[1];
      dispatch(changePlan({ dateId, [e.target.name]: e.target.value }));
    },
    [dispatch],
  );

  return { plans, handleChangePlans };
};
