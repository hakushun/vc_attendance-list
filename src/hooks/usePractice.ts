import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { selectEvent } from '../redux/modules/app/event';
import { selectLocations } from '../redux/modules/app/locations';
import { selectPlans } from '../redux/modules/app/plans';
import {
  focusPractice,
  PracticeItem,
  selectDateId,
  selectIsLoading,
  selectPractice,
  subscribePractice,
  update,
} from '../redux/modules/domain/practice';
import { selectRemarks } from '../redux/modules/app/remarks';
import { selectSettingIsShown } from '../redux/modules/ui/show';

type Hooks = {
  practice: PracticeItem;
  dateId: string;
  isLoading: boolean;
  handleFocusPractice: (_id: string) => void;
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
  const dateId = useSelector(selectDateId);
  const isLoading = useSelector(selectIsLoading);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleFocusPractice = useCallback(
    (id: string) => {
      dispatch(focusPractice(id));
    },
    [dispatch],
  );

  const handleUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(update({ event, practice: { locations, plans, remarks } }));
    },
    [dispatch, event, locations, plans, remarks],
  );

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

  useEffect(() => {
    dispatch(subscribePractice(practice));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingIsShown]);

  return { practice, dateId, isLoading, handleFocusPractice, handleUpdate };
};
