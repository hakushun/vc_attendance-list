import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { selectEvent } from '../redux/modules/event';
import { Part, selectPart } from '../redux/modules/part';
import { selectIsLoading, selectParts, subscribePart, update } from '../redux/modules/parts';

type Hooks = {
  parts: Part[];
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const useParts = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const part = useSelector(selectPart);
  const parts = useSelector(selectParts);
  const isLoading = useSelector(selectIsLoading);

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // TODO:validation
    if (part.some((item) => item.name.trim() === '')) return;
    dispatch(update({ event, part }));
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('parts')
      .doc(eventId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as { part: Part[] } | undefined;
        data && dispatch(subscribePart(data.part));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { parts, isLoading, handleUpdate };
};