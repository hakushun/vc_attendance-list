import type { MutableRefObject } from 'react';
import type React from 'react';
import type { Message } from '../../../redux/modules/ui/dialog';
import { Modal } from '../Modal';
import { SecondaryButton } from '../SecondaryButton';
import styles from './index.module.scss';

type Props = {
  dialogRef: MutableRefObject<HTMLElement | null>;
  dialogMessage: Message;
  handleToggleDialog: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
};
export const Dialog: React.FC<Props> = ({
  dialogRef,
  dialogMessage,
  handleToggleDialog,
  handleKeydown,
}) => {
  return (
    <Modal modalRef={dialogRef} handleToggle={handleToggleDialog} handleKeydown={handleKeydown}>
      <div className={styles.root}>
        <div className={styles.title}>{dialogMessage.title}</div>
        <div>{dialogMessage.description}</div>
        <SecondaryButton label="閉じる" disabled={false} handleClick={handleToggleDialog} />
      </div>
    </Modal>
  );
};
