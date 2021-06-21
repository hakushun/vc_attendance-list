import { MutableRefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPracticeModalIsShown, togglePracticeModal } from '../redux/modules/modal';

type Hooks = {
  modalRef: MutableRefObject<HTMLElement | null>;
  practiceModalIsShown: boolean;
  handleTogglePracticeModal: () => void;
};

export const useModal = (): Hooks => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLElement | null>(null);
  const practiceModalIsShown = useSelector(selectPracticeModalIsShown);

  const handleTogglePracticeModal = () => {
    dispatch(togglePracticeModal(!practiceModalIsShown));
  };

  useEffect(() => {
    modalRef.current?.focus();
    return () => {
      const target = document.getElementById('attendance_table');
      target?.focus();
    };
  }, []);
  return { modalRef, practiceModalIsShown, handleTogglePracticeModal };
};
