import React, { forwardRef } from 'react';
import styles from './index.module.scss';

type Props = {
  level: number;
  label: string;
};
export const Heading = React.memo(
  forwardRef<HTMLHeadingElement, Props>(({ level, label }, ref) => {
    if (level === 2) {
      return (
        <h2 className={styles.root} ref={ref} tabIndex={-1}>
          <span>{label}</span>
        </h2>
      );
    }
    if (level === 3) {
      return (
        <h3 className={styles.root} ref={ref} tabIndex={-1}>
          <span>{label}</span>
        </h3>
      );
    }
    return null;
  }),
);
