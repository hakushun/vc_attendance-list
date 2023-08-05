import React from 'react';
import { Event } from '../../../redux/modules/app/event';
import { useTab } from '../../../hooks/useTab';
import { Setting as Presentational } from './Setting';
import { useShow } from '../../../hooks/useShow';

type Props = {
  event: Event;
  partsIsLoading: boolean;
  handlePartsUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  practiceIsLoading: boolean;
  handlePracticeUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  programsIsLoading: boolean;
  handleProgramsUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Setting: React.VFC<Props> = React.memo(
  ({
    event,
    partsIsLoading,
    handlePartsUpdate,
    practiceIsLoading,
    handlePracticeUpdate,
    programsIsLoading,
    handleProgramsUpdate,
  }) => {
    const { tab, handleChangeSettingTab } = useTab();
    const { settingIsShown, handleToggleSetting } = useShow();

    if (!settingIsShown) return null;

    return (
      <Presentational
        event={event}
        handleToggleSetting={handleToggleSetting}
        partsIsLoading={partsIsLoading}
        handlePartsUpdate={handlePartsUpdate}
        practiceIsLoading={practiceIsLoading}
        handlePracticeUpdate={handlePracticeUpdate}
        programsIsLoading={programsIsLoading}
        handleProgramsUpdate={handleProgramsUpdate}
        tab={tab}
        handleChangeSettingTab={handleChangeSettingTab}
      />
    );
  },
);
