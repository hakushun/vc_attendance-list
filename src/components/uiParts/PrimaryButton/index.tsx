import React from 'react';
import styles from './index.module.scss';

type Props = {
  label: string;
};
export const PrimaryButton: React.VFC<Props> = ({ label }) => {
  return (
    <button type="button" className={styles.root}>
      {label}
    </button>
  );
};
