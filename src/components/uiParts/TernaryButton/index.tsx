import React from 'react';
import styles from './index.module.scss';

type Props = {
  label: string;
  disabled: boolean;
  handleClick: () => void;
};
export const TernaryButton: React.VFC<Props> = ({ label, disabled, handleClick }) => {
  return (
    <button type="button" disabled={disabled} onClick={handleClick} className={styles.root}>
      {label}
    </button>
  );
};
