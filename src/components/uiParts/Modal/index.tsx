import React from 'react';
import { CloseButton } from '../CloseButton';
import { Overlay } from '../Overlay/indes';
import styles from './index.module.scss';

type Props = {
  modalRef: React.MutableRefObject<HTMLElement | null>;
  handleToggle: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
  children: React.ReactNode;
};
export const Modal: React.FC<Props> = React.memo(
  ({ modalRef, handleToggle, handleKeydown, children }) => {
    return (
      <Overlay>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <section
          role="dialog"
          aria-modal="true"
          ref={modalRef}
          tabIndex={-1}
          className={styles.root}
          onKeyDown={handleKeydown}>
          {children}
          <CloseButton handleToggle={handleToggle} />
        </section>
      </Overlay>
    );
  },
);
