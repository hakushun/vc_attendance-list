import React from 'react';
import styles from './index.module.scss';

type Props = {
  id: string;
};
export const Sectioning: React.FC<Props> = ({ id, children }) => {
  return (
    <section id={id} className={styles.root}>
      {children}
    </section>
  );
};
