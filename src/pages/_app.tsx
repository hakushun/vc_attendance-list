import type React from 'react';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { initStore } from '../redux/store';
import { closeAll } from '../redux/modules/ui/show';
import { useRouter } from '../hooks/useRouter';
import { Layout } from '../components/Layout';

import '../styles/reset.scss';
import '../styles/global.scss';
import { closeAllModal } from '../redux/modules/ui/modal';

// useDispatch は Provider の内側でしか使えないため、App 本体と Provider を張る側を分けている
function AppContent({ Component, pageProps }: AppProps): React.ReactElement {
  const { router } = useRouter();
  const dispatch = useAppDispatch();

  const handleRouteChange = () => {
    const main = document.getElementById('main');
    main?.focus();
    dispatch(closeAll());
    dispatch(closeAllModal());
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="overlay" />
    </>
  );
}

function App(props: AppProps): React.ReactElement {
  // サーバーではレンダリングごとに、クライアントでは App のマウント時に一度だけ store を作る。
  // モジュールスコープの単一 store にすると、サーバー側でリクエスト間の状態が共有されてしまう
  const [store] = useState(initStore);

  return (
    <Provider store={store}>
      <AppContent {...props} />
    </Provider>
  );
}

export default App;
