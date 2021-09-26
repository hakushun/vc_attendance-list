import { NextPage } from 'next';
import React from 'react';
import { Event } from '../../components/Event';
import { Loading } from '../../components/uiParts/Loading';
import { useRouter } from '../../hooks/useRouter';

const EventPage: NextPage = () => {
  const { router } = useRouter();
  const eventId = router.query.id;

  if (typeof eventId !== 'string') return <Loading />;

  return <Event eventId={eventId} />;
};

export default EventPage;
