import { MutableRefObject, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const handleTogglePracticeModal = () => {
    dispatch(togglePracticeModal(!practiceModalIsShown));
  };

  const handleToggleCovidResult = () => {
    dispatch(toggleCovidResult(!covidResultIsShown));
  };

  const handleTogglePasswordReset = () => {
    dispatch(togglePasswordReset(!passwordResetIsShown));
  };

  const getFocusableElements = (ref: React.MutableRefObject<HTMLElement | null>) => {
    const focusableElementsString =
      'a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"], [contenteditable]';
    return Array.prototype.slice.call(
      ref?.current?.querySelectorAll(focusableElementsString),
    ) as HTMLElement[];
  };

  const getNextFocusableElement = (
    ref: React.MutableRefObject<HTMLElement | null>,
    backward: boolean,
  ) => {
    const focusable = getFocusableElements(ref);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (backward && document.activeElement === first) return last;
    if (!backward && document.activeElement === last) return first;
    return null;
  };

  const handleTabDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const backward = e.shiftKey;
    const nextFocus = getNextFocusableElement(modalRef, backward);
    if (nextFocus) {
      e.preventDefault();
      nextFocus.focus();
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case 'Escape':
        dispatch(closeAllModal());
        break;
      case 'Tab':
        handleTabDown(e);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    modalRef.current?.focus();
    return () => {
      const target = document.getElementById('attendance_table');
      target?.focus();
    };
  }, []);
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
