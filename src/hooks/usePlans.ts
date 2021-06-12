import { useDispatch, useSelector } from 'react-redux';
import { changePlan, Plan, selectPlans } from '../redux/modules/plans';

type Hooks = {
  plans: Plan[];
  handleChangePlans: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
export const usePlans = (): Hooks => {
  const dispatch = useDispatch();
  const plans = useSelector(selectPlans);

  const handleChangePlans = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const dateId = e.target.id.split('-')[1];
    dispatch(changePlan({ dateId, [e.target.name]: e.target.value }));
  };

  return { plans, handleChangePlans };
};
