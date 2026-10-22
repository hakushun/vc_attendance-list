import type React from 'react';
import { useDialog } from '../../../hooks/useDialog';
import { Dialog as Presentational } from './Dialog';

export const Dialog: React.FC = () => {
  const { dialogRef, dialogIsOpened, dialogMessage, handleToggleDialog, handleKeydown } =
    useDialog();

  if (!dialogIsOpened) return null;

  return (
    <Presentational
      dialogRef={dialogRef}
      dialogMessage={dialogMessage}
      handleToggleDialog={handleToggleDialog}
      handleKeydown={handleKeydown}
    />
  );
};
