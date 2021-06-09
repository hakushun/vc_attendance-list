import React from 'react';
import { useShow } from '../../../hooks/useShow';
import { useSign } from '../../../hooks/useSign';
import { useUser } from '../../../hooks/useUser';
import { QuaternaryButton } from '../../uiParts/QuaternaryButton';
import styles from './index.module.scss';

export const Header: React.VFC= () => {
  const { user } = useUser();
  const { handleSignOut } = useSign();
  const { handleToggleEventForm, handleToggleSetting } = useShow();

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.title}>出欠さん</h1>
        {user && (
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li>
                <QuaternaryButton label="イベント作成" handleClick={handleToggleEventForm} />
              </li>
              <li>
                <QuaternaryButton label="設定" handleClick={handleToggleSetting} />
              </li>
              <li>
                <QuaternaryButton label="Logout" handleClick={handleSignOut} />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
