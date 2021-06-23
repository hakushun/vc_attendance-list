import Link from 'next/link';
import { NextRouter } from 'next/router';
import React from 'react';
import { isSuperuser } from '../../../libs/utils/isSuperuser';
import { Userdata } from '../../../redux/modules/user';
import { QuaternaryButton } from '../../uiParts/QuaternaryButton';
import styles from './index.module.scss';

type Props = {
  router: NextRouter;
  user: Userdata;
  handleSignOut: () => Promise<void>;
  handleToggleEventForm: () => void;
  handleToggleSetting: () => void;
};
export const Header: React.VFC<Props> = React.memo(
  ({ router, user, handleSignOut, handleToggleEventForm, handleToggleSetting }) => {
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
                {router.pathname === '/event/[id]' && isSuperuser(user) && (
                  <>
                    <li>
                      <QuaternaryButton label="イベント編集" handleClick={handleToggleEventForm} />
                    </li>
                    <li>
                      <QuaternaryButton label="設定" handleClick={handleToggleSetting} />
                    </li>
                  </>
                )}
                <li>
                  <QuaternaryButton label="Logout" handleClick={handleSignOut} />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    );
  },
);
