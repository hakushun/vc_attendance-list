import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './index.module.scss';

export const Layout: React.FC = ({ children }) => {
  return (
    <div id="app" className={styles.root}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
