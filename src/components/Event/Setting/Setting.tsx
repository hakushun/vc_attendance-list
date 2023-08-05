import clsx from 'clsx';
import React from 'react';
import { Practice } from './Practice';
import { Sectioning } from '../../uiParts/Sectioning';
import { Heading } from '../../uiParts/Heading';
import { Program } from './Program';
import { Part } from './Part';
import { Event } from '../../../redux/modules/app/event';
import { Tab } from '../../../redux/modules/ui/tab';
import styles from './index.module.scss';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
  partsIsLoading: boolean;
  handlePartsUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  practiceIsLoading: boolean;
  handlePracticeUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  programsIsLoading: boolean;
  handleProgramsUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tab: Tab;
  handleChangeSettingTab: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Setting: React.VFC<Props> = React.memo(
  ({
    event,
    handleToggleSetting,
    partsIsLoading,
    handlePartsUpdate,
    practiceIsLoading,
    handlePracticeUpdate,
    programsIsLoading,
    handleProgramsUpdate,
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
              <Practice
                event={event}
                handleToggleSetting={handleToggleSetting}
                isLoading={practiceIsLoading}
                handleUpdate={handlePracticeUpdate}
              />
            )}
            {tab.setting === 'program' && (
              <Program
                event={event}
                handleToggleSetting={handleToggleSetting}
                isLoading={programsIsLoading}
                handleUpdate={handleProgramsUpdate}
              />
            )}
            {tab.setting === 'part' && (
              <Part
                handleToggleSetting={handleToggleSetting}
                isLoading={partsIsLoading}
                handleUpdate={handlePartsUpdate}
              />
            )}
          </div>
        </div>
      </Sectioning>
    );
  },
);
