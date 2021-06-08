import React from 'react';
import { QuaternaryButton } from '../../uiParts/QuaternaryButton';
import styles from './index.module.scss';

export const Header: React.VFC = () => {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.title}>出欠さん</h1>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <QuaternaryButton label="イベント作成" />
            </li>
            <li>
              <QuaternaryButton label="設定" />
            </li>
            <li>
              <QuaternaryButton label="Logout" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
