import React from 'react';
import { Sectioning } from '../../uiParts/Sectioning';
import styles from './index.module.scss';
import { Heading } from '../../uiParts/Heading';
import { StringWithUrl } from '../../uiParts/StringWithUrl';
import { Event } from '../../../redux/modules/app/event';

type Props = {
  event: Event;
};
export const EventHeader: React.VFC<Props> = React.memo(({ event }) => {
  return (
    <Sectioning id="event_header">
      <Heading level={2} label={event.title} />
      <div className={styles.wrapper}>
        <p className={styles.detail}>
          <StringWithUrl content={event.detail} />
        </p>
      </div>
    </Sectioning>
  );
});
