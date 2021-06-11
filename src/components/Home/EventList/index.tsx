import React from 'react';
import { useEvent } from '../../../hooks/useEvent';
import { useEvents } from '../../../hooks/useEvents';
import { Heading } from '../../uiParts/Heading';
import { Sectioning } from '../../uiParts/Sectioning';
import styles from './index.module.scss';

export const EventList: React.VFC = () => {
  const { handleFocusEvent } = useEvent();
  const { events } = useEvents();

  return (
    <Sectioning id="event_list">
      <Heading level={2} label="イベント一覧" />
      <ul className={styles.list}>
        {events.map((event) => (
          <li key={event.id}>
            <button type="button" className={styles.button} onClick={() => handleFocusEvent(event)}>
              {event.title}
            </button>
          </li>
        ))}
      </ul>
    </Sectioning>
  );
};
