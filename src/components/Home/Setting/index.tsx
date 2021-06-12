import clsx from 'clsx';
import React from 'react';
import { useTab } from '../../../hooks/useTab';
import { Practice } from './Practice';
import { Sectioning } from '../../uiParts/Sectioning';
import { Heading } from '../../uiParts/Heading';
import styles from './index.module.scss';
import { useEvent } from '../../../hooks/useEvent';
import { useShow } from '../../../hooks/useShow';

export const Setting: React.VFC = () => {
  const { handleToggleSetting } = useShow();
  const { tab, handleChangeSettingTab } = useTab();
  const { event } = useEvent();
  return (
    <Sectioning id="setting">
      <Heading level={2} label="各種設定" />
      <div className={styles.wrapper}>
        <div role="tablist" className={styles.tablist}>
          <button
            role="tab"
            aria-controls="practice"
            aria-selected={tab.setting === 'practice'}
            type="button"
            className={clsx(styles.tab, tab.setting === 'practice' && styles.selected)}
            onClick={handleChangeSettingTab}>
            練習予定
          </button>
          <button
            role="tab"
            aria-controls="program"
            aria-selected={tab.setting === 'program'}
            type="button"
            className={clsx(styles.tab, tab.setting === 'program' && styles.selected)}
            onClick={handleChangeSettingTab}>
            プログラム
          </button>
          <button
            role="tab"
            aria-controls="role"
            aria-selected={tab.setting === 'role'}
            type="button"
            className={clsx(styles.tab, tab.setting === 'role' && styles.selected)}
            onClick={handleChangeSettingTab}>
            乗り番
          </button>
          <button
            role="tab"
            aria-controls="part"
            aria-selected={tab.setting === 'part'}
            type="button"
            className={clsx(styles.tab, tab.setting === 'part' && styles.selected)}
            onClick={handleChangeSettingTab}>
            パート
          </button>
        </div>
        <div role="tabpanel" id={tab.setting} className={styles.tabpanel}>
          {tab.setting === 'practice' && (
            <Practice event={event} handleToggleSetting={handleToggleSetting} />
          )}
        </div>
      </div>
    </Sectioning>
  );
};
