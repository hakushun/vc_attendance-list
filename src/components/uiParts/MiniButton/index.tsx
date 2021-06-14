import React from 'react';
import { ChangeOrderPayload } from '../../../redux/modules/part';
import styles from './index.module.scss';

type Props = {
  label: string;
  index: number;
  order: number;
  disabled: boolean;
  handleClick: (_: ChangeOrderPayload) => void;
};
export const MiniButton: React.VFC<Props> = ({ label, index, order, disabled, handleClick }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => handleClick({ index, order })}
      className={styles.root}>
      {label}
    </button>
  );
};
