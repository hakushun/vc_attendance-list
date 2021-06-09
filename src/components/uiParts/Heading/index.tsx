import React from 'react';
import styles from './index.module.scss';

type Props = {
  level: number;
  label: string;
};
export const Heading: React.VFC<Props> = ({ level, label }) => {
  if (level === 2) {
    return <h2 className={styles.root}>{label}</h2>;
  }
  if (level === 3) {
    return <h3 className={styles.root}>{label}</h3>;
  }
  return null;
};
