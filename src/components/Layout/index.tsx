import React from 'react';
import { Dialog } from '../uiParts/Dialog';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = React.memo(({ children }) => {
  return (
    <div id="app" className={styles.root}>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Dialog />
      <Footer />
    </div>
  );
});
