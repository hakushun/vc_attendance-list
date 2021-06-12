import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, Location, selectLocations } from '../redux/modules/locations';

type Hooks = {
  locations: Location[];
  handleChangeLocations: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useLocations = (): Hooks => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);

  const handleChangeLocations = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateId = e.target.id.split('-')[1];
    dispatch(changeLocation({ dateId, [e.target.name]: e.target.value }));
  };

  return { locations, handleChangeLocations };
};
