import React from 'react';
import styles from './index.module.scss';

type Props = {
  label: string;
  handleClick: () => void;
};
export const TernaryButton: React.VFC<Props> = ({ label, handleClick }) => {
  return (
    <button type="button" onClick={handleClick} className={styles.root}>
      {label}
    </button>
  );
};
