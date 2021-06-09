import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Loading } from '../uiParts/Loading';

export const Home: React.VFC = () => {
  const { isLoading } = useUser();

  if(isLoading) return <Loading />

  return <section>HOME</section>;
};
