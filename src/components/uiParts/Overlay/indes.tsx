import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Overlay: React.FC<Props> = React.memo(({ children }) => {
  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(
      <div className={styles.root}>{children}</div>,
      document.getElementById('overlay')!,
    );
  }
  return null;
});
