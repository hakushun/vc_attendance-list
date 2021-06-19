import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Loading } from '../uiParts/Loading';
import { EventForm } from '../EventForm';
import { EventList } from './EventList';

export const Home: React.VFC = () => {
  const { isLoading } = useUser();

  if (isLoading) return <Loading />;

  return (
    <>
      <EventForm />
      <EventList />
    </>
  );
};
