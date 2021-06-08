import React from 'react';
import styles from './index.module.scss';

type Props = {
  label: string;
};
export const TernaryButton: React.VFC<Props> = ({ label }) => {
  return (
    <button type="button" className={styles.root}>
      {label}
    </button>
  );
};
