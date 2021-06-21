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
import { useAttendance } from '../../hooks/useAttendance';
import { useAttendances } from '../../hooks/useAttendances';
import { useParts } from '../../hooks/useParts';
import { usePractice } from '../../hooks/usePractice';
import { useProgram } from '../../hooks/useProgram';
import { usePrograms } from '../../hooks/usePrograms';
import { useRoles } from '../../hooks/useRoles';
import { useModal } from '../../hooks/useModal';

type Props = {
  eventId: string;
};
export const Event: React.VFC<Props> = ({ eventId }) => {
  const { isLoading, user } = useUser();
  const { settingIsShown, attendanceFormIsShown, handleToggleSetting, handleToggleAttendanceForm } =
    useShow();
  const { targetEvent } = useEvents(eventId);
  const { event } = useEvent(targetEvent);
  const { parts } = useParts(eventId);
  const {
    attendance,
    handleChangeAttendance,
    handleChangeRemark,
    handleClickRadio,
    handleKeyDownRadio,
    handleFocusAttendance,
  } = useAttendance();
  const {
    attendances,
    isLoading: AttendanceIsLoading,
    handleCreate,
    handleUpdate,
    handleRemove,
  } = useAttendances(eventId);
  const { practice, dateId, handleFocusPractice } = usePractice(eventId);
  const { selectedId, handleFocusProgram } = useProgram();
  const { programs } = usePrograms(eventId);
  const { roles } = useRoles(eventId);
  const { practiceModalIsShown } = useModal();

  if (isLoading) return <Loading />;

  return (
    <>
      {settingIsShown && <Setting event={event} handleToggleSetting={handleToggleSetting} />}
      <EventForm />
      <EventHeader event={event} />
      <AttendanceForm
        user={user}
        attendanceFormIsShown={attendanceFormIsShown}
        handleToggleAttendanceForm={handleToggleAttendanceForm}
        event={event}
        parts={parts}
        attendance={attendance}
        handleChangeAttendance={handleChangeAttendance}
        handleChangeRemark={handleChangeRemark}
        handleClickRadio={handleClickRadio}
        handleKeyDownRadio={handleKeyDownRadio}
        attendances={attendances}
        AttendanceIsLoading={AttendanceIsLoading}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
      <AttendanceTable
        user={user}
        event={event}
        handleFocusAttendance={handleFocusAttendance}
        attendances={attendances}
        AttendanceIsLoading={AttendanceIsLoading}
        handleFocusPractice={handleFocusPractice}
        selectedId={selectedId}
        handleFocusProgram={handleFocusProgram}
        programs={programs}
        roles={roles}
      />
      {practiceModalIsShown && <PracticeDetail event={event} practice={practice} dateId={dateId} />}
    </>
  );
};
