import React from 'react';
import { Overlay } from '../Overlay/indes';
import styles from './index.module.scss';

export const Modal: React.FC = ({ children }) => {
  return (
    <Overlay>
      <section role="dialog" aria-modal="true" tabIndex={-1} className={styles.root}>
        {children}
      </section>
    </Overlay>
  );
};
