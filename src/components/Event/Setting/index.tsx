import clsx from 'clsx';
import React from 'react';
import { Practice } from './Practice';
import { Sectioning } from '../../uiParts/Sectioning';
import { Heading } from '../../uiParts/Heading';
import { Program } from './Program';
import { Part } from './Part';
import { Role } from './Role';
import { Event } from '../../../redux/modules/event';
import styles from './index.module.scss';
import { usePart } from '../../../hooks/usePart';
import { useParts } from '../../../hooks/useParts';
import { useAttendances } from '../../../hooks/useAttendances';
import { usePrograms } from '../../../hooks/usePrograms';
import { useRole } from '../../../hooks/useRole';
import { useRoles } from '../../../hooks/useRoles';
import { useProgram } from '../../../hooks/useProgram';
import { useLocations } from '../../../hooks/useLocations';
import { usePlans } from '../../../hooks/usePlans';
import { usePractice } from '../../../hooks/usePractice';
import { useRemarks } from '../../../hooks/useRemarks';
import { useTab } from '../../../hooks/useTab';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
};
export const Setting: React.VFC<Props> = ({ event, handleToggleSetting }) => {
  const {
    part,
    handleChange: handlePartChange,
    handleAddPartForm,
    handleDeletePartForm,
    handleChangeOrder,
  } = usePart();
  const { attendances } = useAttendances(event.id);
  const { parts, isLoading: PartsIsLoading, handleUpdate: handlePartsUpdate } = useParts(event.id);
  const {
    programs,
    isLoading: ProgramsIsLoading,
    handleUpdate: handleProgramsUpdate,
  } = usePrograms(event.id);
  const { programId, roles, handleChangeRadio, handleChangeRole } = useRole();
  const { isLoading: RolesIsLoading, handleUpdate: handleRolesUpdate } = useRoles(event.id);
  const {
    program,
    handleChange: handleProgramChange,
    handleAddProgramForm,
    handleDeleteProgramForm,
  } = useProgram();
  const { locations, handleChangeLocations } = useLocations();
  const { plans, handleChangePlans } = usePlans();
  const { remarks, handleChangeRemarks } = useRemarks();
  const { isLoading: PracticeIsLoading, handleUpdate: handlePracticeUpdate } = usePractice(
    event.id!,
  );
  const { tab, handleChangeSettingTab } = useTab();

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
            <Practice
              event={event}
              handleToggleSetting={handleToggleSetting}
              locations={locations}
              handleChangeLocations={handleChangeLocations}
              plans={plans}
              handleChangePlans={handleChangePlans}
              remarks={remarks}
              handleChangeRemarks={handleChangeRemarks}
              isLoading={PracticeIsLoading}
              handleUpdate={handlePracticeUpdate}
            />
          )}
          {tab.setting === 'program' && (
            <Program
              event={event}
              handleToggleSetting={handleToggleSetting}
              program={program}
              handleChange={handleProgramChange}
              handleAddProgramForm={handleAddProgramForm}
              handleDeleteProgramForm={handleDeleteProgramForm}
              isLoading={ProgramsIsLoading}
              handleUpdate={handleProgramsUpdate}
            />
          )}
          {tab.setting === 'role' && (
            <Role
              handleToggleSetting={handleToggleSetting}
              programs={programs}
              parts={parts}
              attendances={attendances}
              programId={programId}
              roles={roles}
              handleChangeRadio={handleChangeRadio}
              handleChangeRole={handleChangeRole}
              isLoading={RolesIsLoading}
              handleUpdate={handleRolesUpdate}
            />
          )}
          {tab.setting === 'part' && (
            <Part
              handleToggleSetting={handleToggleSetting}
              part={part}
              handleChange={handlePartChange}
              handleAddPartForm={handleAddPartForm}
              handleDeletePartForm={handleDeletePartForm}
              handleChangeOrder={handleChangeOrder}
              isLoading={PartsIsLoading}
              handleUpdate={handlePartsUpdate}
            />
          )}
        </div>
      </div>
    </Sectioning>
  );
};
