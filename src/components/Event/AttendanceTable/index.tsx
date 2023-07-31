import React, { useEffect } from 'react';
import { useAttendance } from '../../../hooks/useAttendance';
import { useProgram } from '../../../hooks/useProgram';
import { isBefore } from '../../../libs/dayjs/isBefore';
import { Attendance } from '../../../redux/modules/app/attendance';
import { Event } from '../../../redux/modules/app/event';
import { ProgramItem } from '../../../redux/modules/app/program';
import { RoleItem } from '../../../redux/modules/app/role';
import { Userdata } from '../../../redux/modules/app/user';
import { Loading } from '../../uiParts/Loading';
import { AttendanceTable as Presentational } from './AttendanceTable';

type Props = {
  user: Userdata;
  event: Event;
  attendances: Attendance[];
  isLoading: boolean;
  handleFocusPractice: (_id: string) => void;
  programs: ProgramItem[];
  roles: RoleItem[];
};
export const AttendanceTable: React.VFC<Props> = React.memo(
  ({ user, event, attendances, isLoading, handleFocusPractice, programs, roles }) => {
    const { handleFocusAttendance } = useAttendance();
    const { selectedId, handleFocusProgram } = useProgram();

    // 過去日の出欠は非表示にする
    useEffect(() => {
      const targetIds = event.dates.filter((date) => isBefore(date.day));
      const targetCells = targetIds.reduce<HTMLElement[]>((acc, current) => {
        const cells = Array.from<HTMLElement>(
          document.querySelectorAll(`[data-columns="${current.id}"]`),
        );
        acc.push(...cells);
        return acc;
      }, []);
      targetCells.forEach((target) => {
        target.classList.add('isHidden');
      });
    }, [attendances, event.dates]);

    if (isLoading) return <Loading />;

    return (
      <Presentational
        user={user}
        event={event}
        attendances={attendances}
        handleFocusPractice={handleFocusPractice}
        programs={programs}
        roles={roles}
        handleFocusAttendance={handleFocusAttendance}
        selectedId={selectedId}
        handleFocusProgram={handleFocusProgram}
      />
    );
  },
);
