import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleTabDown } from '../libs/utils/handleTabDown';
import {
  closeAllModal,
  selectCovidResultIsShown,
  selectPasswordResetIsShown,
  selectPracticeModalIsShown,
  toggleCovidResult,
  togglePasswordReset,
  togglePracticeModal,
} from '../redux/modules/modal';

type Hooks = {
  modalRef: MutableRefObject<HTMLElement | null>;
  practiceModalIsShown: boolean;
  covidResultIsShown: boolean;
  passwordResetIsShown: boolean;
  handleTogglePracticeModal: () => void;
  handleToggleCovidResult: () => void;
  handleTogglePasswordReset: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
};

export const useModal = (): Hooks => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLElement | null>(null);
  const practiceModalIsShown = useSelector(selectPracticeModalIsShown);
  const covidResultIsShown = useSelector(selectCovidResultIsShown);
  const passwordResetIsShown = useSelector(selectPasswordResetIsShown);

  const handleTogglePracticeModal = useCallback(() => {
    dispatch(togglePracticeModal(!practiceModalIsShown));
  }, [dispatch, practiceModalIsShown]);

  const handleToggleCovidResult = useCallback(() => {
    dispatch(toggleCovidResult(!covidResultIsShown));
  }, [covidResultIsShown, dispatch]);

  const handleTogglePasswordReset = useCallback(() => {
    dispatch(togglePasswordReset(!passwordResetIsShown));
  }, [dispatch, passwordResetIsShown]);

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case 'Escape':
          dispatch(closeAllModal());
          break;
        case 'Tab':
          handleTabDown(modalRef, e);
          break;
        default:
          break;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    modalRef.current?.focus();
    return () => {
      const target = document.getElementById('attendance_table');
      target?.focus();
    };
  }, [practiceModalIsShown, covidResultIsShown, passwordResetIsShown]);
  return {
    modalRef,
    practiceModalIsShown,
    covidResultIsShown,
    passwordResetIsShown,
    handleTogglePracticeModal,
    handleToggleCovidResult,
    handleTogglePasswordReset,
    handleKeydown,
  };
};
