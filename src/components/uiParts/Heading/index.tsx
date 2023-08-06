import React, { forwardRef } from 'react';
import styles from './index.module.scss';

type Props = {
  level: 2 | 3 | 4;
  label: string;
};
export const Heading = React.memo(
  forwardRef<HTMLHeadingElement, Props>(({ level, label }, ref) => {
    switch (level) {
      case 2:
        return (
          <h2 className={styles.main} ref={ref} tabIndex={-1}>
            <span>{label}</span>
          </h2>
        );
      case 3:
        return (
          <h3 className={styles.main} ref={ref} tabIndex={-1}>
            <span>{label}</span>
          </h3>
        );
      case 4:
        return (
          <h4 className={styles.sub} ref={ref} tabIndex={-1}>
            <span>{label}</span>
          </h4>
        );
      default:
        return null;
    }
  }),
);
