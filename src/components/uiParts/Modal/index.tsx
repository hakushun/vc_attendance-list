import React from 'react';
import { Overlay } from '../Overlay/indes';
import styles from './index.module.scss';

type Props = {
  modalRef: React.MutableRefObject<HTMLElement | null>;
};
// TODO: tab閉じ込め
export const Modal: React.FC<Props> = ({ modalRef, children }) => {
  return (
    <Overlay>
      <section role="dialog" aria-modal="true" ref={modalRef} tabIndex={-1} className={styles.root}>
        {children}
      </section>
    </Overlay>
  );
};
