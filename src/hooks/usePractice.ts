import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { selectEvent } from '../redux/modules/event';
import { selectLocations } from '../redux/modules/locations';
import { selectPlans } from '../redux/modules/plans';
import {
  PracticeItem,
  selectIsLoading,
  selectPractice,
  subscribePractice,
  update,
} from '../redux/modules/practice';
import { selectRemarks } from '../redux/modules/remarks';

type Hooks = {
  practice: PracticeItem;
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const usePractice = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const locations = useSelector(selectLocations);
  const plans = useSelector(selectPlans);
  const remarks = useSelector(selectRemarks);
  const practice = useSelector(selectPractice);
  const isLoading = useSelector(selectIsLoading);

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(update({ event, practice: { locations, plans, remarks } }));
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('practices')
      .doc(eventId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as PracticeItem | undefined;
        data && dispatch(subscribePractice(data));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { practice, isLoading, handleUpdate };
};
