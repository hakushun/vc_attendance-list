import { NextPage } from 'next';
import React from 'react';
import { Event } from '../../components/Event';
import { useRouter } from '../../hooks/useRouter';

const EventPage: NextPage = () => {
  const { router } = useRouter();
  const { id } = router.query;

  return <Event eventId={typeof id === 'string' ? id : ''} />;
};

export default EventPage;
