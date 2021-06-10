import React from 'react';
import styles from './index.module.scss';

type Props = {
  label: string;
  handleClick: () => void;
};
export const SecondaryButton: React.VFC<Props> = ({ label, handleClick }) => {
  return (
    <button type="button" onClick={handleClick} className={styles.root}>
      {label}
    </button>
  );
};
