import React from 'react';
import styles from './index.module.scss';

type Props = {
  handleToggle: () => void;
};
export const CloseButton: React.VFC<Props> = ({ handleToggle }) => {
  return (
    <button type="button" className={styles.root} onClick={handleToggle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};
