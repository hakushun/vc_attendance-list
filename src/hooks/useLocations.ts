import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import type { Location } from '../redux/modules/app/locations';
import { changeLocation, selectLocations } from '../redux/modules/app/locations';

type Hooks = {
  locations: Location[];
  handleChangeLocations: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useLocations = (): Hooks => {
  const dispatch = useAppDispatch();
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
