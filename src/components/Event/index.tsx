import React from 'react';
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

type Props = {
  eventId: string;
};
export const Event: React.VFC<Props> = React.memo(({ eventId }) => {
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
  const { roles } = useRoles(eventId);
  const {
    targetEvent,
    isLoading: eventsIsLoading,
    handleCreate: handleEventCreate,
    handleUpdate: handleEventUpdate,
    handleRemove: handleEventRemove,
  } = useEvents(eventId);
  const {
    attendances,
    isLoading: attendanceIsLoading,
    breakdownAttendances,
    handleCreate: handleAttendanceCreate,
    handleUpdate: handleAttendanceUpdate,
    handleRemove: handleAttendanceRemove,
  } = useAttendances(eventId);
  // app
  const { isLoading, user } = useUser();
  const { event } = useEvent(targetEvent);

  if (!targetEvent) return null;
  if (isLoading) return <Loading />;

  return (
    <>
      <Setting
        event={targetEvent}
        partsIsLoading={partsIsLoading}
        handlePartsUpdate={handlePartsUpdate}
        practiceIsLoading={practiceIsLoading}
        handlePracticeUpdate={handlePracticeUpdate}
        programsIsLoading={programsIsLoading}
        handleProgramsUpdate={handleProgramsUpdate}
      />
      <EventForm
        isLoading={eventsIsLoading}
        handleCreate={handleEventCreate}
        handleUpdate={handleEventUpdate}
        handleRemove={handleEventRemove}
      />
      <EventHeader event={event} />
      <AttendanceForm
        user={user}
        event={targetEvent}
        parts={parts}
        programs={programs}
        attendances={attendances}
        practice={practice}
        isLoading={attendanceIsLoading}
        handleCreate={handleAttendanceCreate}
        handleUpdate={handleAttendanceUpdate}
        handleRemove={handleAttendanceRemove}
      />
      <AttendanceTable
        user={user}
        event={targetEvent}
        attendances={attendances}
        isLoading={attendanceIsLoading}
        handleFocusPractice={handleFocusPractice}
        programs={programs}
        roles={roles}
        practice={practice}
      />
      <PracticeDetail
        event={targetEvent}
        practice={practice}
        dateId={dateId}
        breakdownAttendances={breakdownAttendances}
      />
    </>
  );
});
