import React from 'react';
import { useShow } from '../../hooks/useShow';
import { useUser } from '../../hooks/useUser';
import { Loading } from '../uiParts/Loading';
import { EventForm } from '../EventForm';
import { EventHeader } from './EventHeader';
import { AttendanceForm } from './AttendanceForm';
import { AttendanceTable } from './AttendanceTable';
import { PracticeDetail } from './PracticeDetail';
import { Setting } from './Setting';
import { useEvents } from '../../hooks/useEvents';
import { useEvent } from '../../hooks/useEvent';
import { useAttendances } from '../../hooks/useAttendances';
import { useParts } from '../../hooks/useParts';
import { usePractice } from '../../hooks/usePractice';
import { usePrograms } from '../../hooks/usePrograms';
import { useRoles } from '../../hooks/useRoles';
import { useModal } from '../../hooks/useModal';
import { CovidForm } from './CovidForm';
import { useCovids } from '../../hooks/useCovids';
import { CovidResult } from './CovidResult';

type Props = {
  eventId: string;
};
export const Event: React.VFC<Props> = ({ eventId }) => {
  // domain
  const { parts, isLoading: partsIsLoading, handleUpdate: handlePartsUpdate } = useParts(eventId);
  const {
    practice,
    dateId,
    isLoading: practiceIsLoading,
    handleUpdate: handlePracticeUpdate,
    handleFocusPractice,
  } = usePractice(eventId);
  const {
    programs,
    isLoading: programsIsLoading,
    handleUpdate: handleProgramsUpdate,
  } = usePrograms(eventId);
  const { roles, isLoading: rolesIsLoading, handleUpdate: handleRolesUpdate } = useRoles(eventId);
  const {
    targetEvent,
    isLoading: eventsIsLoading,
    handleCreate: handleEventCreate,
    handleUpdate: handleEventUpdate,
    handleRemove: handleEventRemove,
  } = useEvents(eventId);
  const {
    attendances,
    isLoading: AttendanceIsLoading,
    breakdownAttendances,
    handleCreate: handleAttendanceCreate,
    handleUpdate: handleAttendanceUpdate,
    handleRemove: handleAttendanceRemove,
  } = useAttendances(eventId);
  const {
    isLoading: covidsIsLoading,
    answerRuselt,
    unasweredUsers,
    handleFetch,
    handleCreate: handleCovidCreate,
  } = useCovids(eventId);

  // app
  const { isLoading, user } = useUser();
  const { event } = useEvent(targetEvent);

  // ui
  const { settingIsShown, handleToggleSetting } = useShow();
  const { practiceModalIsShown, covidResultIsShown } = useModal();

  if (isLoading) return <Loading />;

  return (
    <>
      {settingIsShown && (
        <Setting
          event={event}
          handleToggleSetting={handleToggleSetting}
          attendances={attendances}
          parts={parts}
          partsIsLoading={partsIsLoading}
          handlePartsUpdate={handlePartsUpdate}
          practiceIsLoading={practiceIsLoading}
          handlePracticeUpdate={handlePracticeUpdate}
          programs={programs}
          programsIsLoading={programsIsLoading}
          handleProgramsUpdate={handleProgramsUpdate}
          rolesIsLoading={rolesIsLoading}
          handleRolesUpdate={handleRolesUpdate}
        />
      )}
      <EventForm
        isLoading={eventsIsLoading}
        handleCreate={handleEventCreate}
        handleUpdate={handleEventUpdate}
        handleRemove={handleEventRemove}
      />
      <EventHeader event={event} />
      <AttendanceForm
        user={user}
        event={event}
        parts={parts}
        attendances={attendances}
        AttendanceIsLoading={AttendanceIsLoading}
        handleCreate={handleAttendanceCreate}
        handleUpdate={handleAttendanceUpdate}
        handleRemove={handleAttendanceRemove}
      />
      <CovidForm event={event} handleCreate={handleCovidCreate} />
      <AttendanceTable
        user={user}
        event={event}
        attendances={attendances}
        AttendanceIsLoading={AttendanceIsLoading}
        handleFocusPractice={handleFocusPractice}
        programs={programs}
        roles={roles}
        handleFetch={handleFetch}
      />
      {practiceModalIsShown && (
        <PracticeDetail
          event={event}
          practice={practice}
          dateId={dateId}
          breakdownAttendances={breakdownAttendances}
        />
      )}
      {covidResultIsShown && (
        <CovidResult
          isLoading={covidsIsLoading}
          answerRuselt={answerRuselt}
          unasweredUsers={unasweredUsers}
        />
      )}
    </>
  );
};
