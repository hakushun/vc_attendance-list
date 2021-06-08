import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { Layout } from '../components/Layout';

import '../styles/reset.scss';
import '../styles/global.scss';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="overlay" />
    </>
  );
}

export default wrapper.withRedux(App);
