import React from 'react';
import { useEvents } from '../../../hooks/useEvents';
import { EventList as Presentational } from './EventList';

export const EventList: React.VFC = () => {
  const { events } = useEvents();

  return <Presentational events={events} />;
};
