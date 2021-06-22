import { useDispatch, useSelector } from 'react-redux';
import { Covid, selectCovid } from '../redux/modules/covid';
import { create, fetch, selectCovids, selectIsLoading } from '../redux/modules/covids';

type Hooks = {
  covids: Covid[];
  isLoading: boolean;
  handleFetch: (_dateId: string) => void;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const useCovids = (eventId: string): Hooks => {
  const dispatch = useDispatch();
  const covid = useSelector(selectCovid);
  const covids = useSelector(selectCovids);
  const isLoading = useSelector(selectIsLoading);

  const handleFetch = (dateId: string) => {
    dispatch(fetch({ eventId, dateId }));
  };

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(create({ eventId, covid }));
  };
  return { covids, isLoading, handleFetch, handleCreate };
};
