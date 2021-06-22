import { useDispatch, useSelector } from 'react-redux';
import { changeCovidAnswers, changeCovidDate, Covid, selectCovid } from '../redux/modules/covid';
import { selectUser } from '../redux/modules/user';

type Hooks = {
  covid: Covid;
  handleChangeCovidDate: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeCovidAnswers: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useCovid = (): Hooks => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const covid = useSelector(selectCovid);

  const handleChangeCovidDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = user?.id;
    if (!userId || e.target.value === '') return;
    dispatch(changeCovidDate({ userId, dateId: e.target.value }));
  };

  const handleChangeCovidAnswers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const question = e.target.name;
    const answer = e.target.id.split('-')[1] as 'yes' | 'no';
    dispatch(changeCovidAnswers({ [question]: answer }));
  };

  return { covid, handleChangeCovidDate, handleChangeCovidAnswers };
};