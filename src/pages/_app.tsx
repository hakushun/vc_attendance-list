import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';

import '../styles/reset.scss';
import '../styles/global.scss';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
