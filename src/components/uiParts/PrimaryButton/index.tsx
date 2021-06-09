import React from 'react';
import styles from './index.module.scss';

type Props = {
  type: 'button' | 'submit';
  label: string;
  handleClick: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const PrimaryButton: React.VFC<Props> = ({ type, label, handleClick }) => {
  return (
    <button type={type} className={styles.root} onClick={handleClick}>
      {label}
    </button>
  );
};
