import Link from 'next/link';
import React from 'react';
import { useRouter } from '../../../hooks/useRouter';
import { useShow } from '../../../hooks/useShow';
import { useSign } from '../../../hooks/useSign';
import { useUser } from '../../../hooks/useUser';
import { QuaternaryButton } from '../../uiParts/QuaternaryButton';
import styles from './index.module.scss';

export const Header: React.VFC = () => {
  const { router } = useRouter();
  const { user } = useUser();
  const { handleSignOut } = useSign();
  const { handleToggleEventForm, handleToggleSetting } = useShow();

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link href="/">
          <a>
            <h1 className={styles.title}>出欠さん</h1>
          </a>
        </Link>
        {user && (
          <nav className={styles.nav}>
            <ul className={styles.list}>
              {router.pathname === '/' && (
                <li>
                  <QuaternaryButton label="イベント作成" handleClick={handleToggleEventForm} />
                </li>
              )}
              {router.pathname === '/event/[id]' && (
                <li>
                  <QuaternaryButton label="イベント編集" handleClick={handleToggleEventForm} />
                </li>
              )}
              {/* TODO: useIdによる出し分け */}
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
