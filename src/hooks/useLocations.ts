import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Location } from '../redux/modules/app/locations';
import { changeLocation, selectLocations } from '../redux/modules/app/locations';

type Hooks = {
  locations: Location[];
  handleChangeLocations: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useLocations = (): Hooks => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);

  const handleChangeLocations = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateId = e.target.id.split('-')[1];
      dispatch(changeLocation({ dateId, [e.target.name]: e.target.value }));
    },
    [dispatch],
  );

  return { locations, handleChangeLocations };
};
