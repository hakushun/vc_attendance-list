import clsx from 'clsx';
import React from 'react';
import { Practice } from './Practice';
import { Sectioning } from '../../uiParts/Sectioning';
import { Heading } from '../../uiParts/Heading';
import { Program } from './Program';
import { Part } from './Part';
import { Role } from './Role';
import { Event } from '../../../redux/modules/event';
import { Tab } from '../../../redux/modules/tab';
import styles from './index.module.scss';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
  tab: Tab;
  handleChangeSettingTab: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Setting: React.VFC<Props> = ({
  event,
  handleToggleSetting,
  tab,
  handleChangeSettingTab,
}) => {
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
          {tab.setting === 'program' && (
            <Program event={event} handleToggleSetting={handleToggleSetting} />
          )}
          {tab.setting === 'role' && (
            <Role event={event} handleToggleSetting={handleToggleSetting} />
          )}
          {tab.setting === 'part' && (
            <Part event={event} handleToggleSetting={handleToggleSetting} />
          )}
        </div>
      </div>
    </Sectioning>
  );
};
