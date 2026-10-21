import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import { handleTabDown } from '../libs/utils/handleTabDown';
import type { Message } from '../redux/modules/ui/dialog';
import { selectDialogIsOpened, selectDialogMessage, toggle } from '../redux/modules/ui/dialog';

type Hooks = {
  dialogRef: MutableRefObject<HTMLElement | null>;
  dialogIsOpened: boolean;
  dialogMessage: Message;
  handleToggleDialog: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
};
export const useDialog = (): Hooks => {
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLElement | null>(null);
  const dialogIsOpened = useSelector(selectDialogIsOpened);
  const dialogMessage = useSelector(selectDialogMessage);

  const handleToggleDialog = useCallback(() => {
    dispatch(toggle(!dialogIsOpened));
  }, [dialogIsOpened, dispatch]);

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case 'Escape':
          dispatch(toggle(false));
          break;
        case 'Tab':
          handleTabDown(dialogRef, e);
          break;
        default:
          break;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    dialogRef.current?.focus();
    return () => {
      const target = document.getElementById('main');
      target?.focus();
    };
  }, [dialogIsOpened]);

  return { dialogRef, dialogIsOpened, dialogMessage, handleToggleDialog, handleKeydown };
};
