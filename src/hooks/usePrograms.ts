import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { selectEvent } from '../redux/modules/event';
import { ProgramItem, selectProgram } from '../redux/modules/program';
import {
  selectIsLoading,
  selectPrograms,
  subscribeProgram,
  update,
} from '../redux/modules/programs';

type Hooks = {
  programs: ProgramItem[];
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const usePrograms = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const program = useSelector(selectProgram);
  const programs = useSelector(selectPrograms);
  const isLoading = useSelector(selectIsLoading);

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // TODO:validation
    if (program.some((item) => item.name.trim() === '')) return;
    dispatch(update({ event, program }));
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('programs')
      .doc(eventId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as { program: ProgramItem[] } | undefined;
        data && dispatch(subscribeProgram(data.program));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { programs, isLoading, handleUpdate };
};
