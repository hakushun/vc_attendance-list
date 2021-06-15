import React from 'react';
import { useEvent } from '../../../hooks/useEvent';
import { Heading } from '../../uiParts/Heading';
import { Sectioning } from '../../uiParts/Sectioning';
import styles from './index.module.scss';

export const EventHeader: React.VFC = () => {
  const { event } = useEvent();

  return (
    <Sectioning id="event_header">
      <Heading level={2} label={event.title} />
      <div className={styles.wrapper}>
        <p className={styles.detail}>{event.detail}</p>
      </div>
    </Sectioning>
  );
};
