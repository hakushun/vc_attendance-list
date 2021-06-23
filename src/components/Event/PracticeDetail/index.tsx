import React from 'react';
import { useModal } from '../../../hooks/useModal';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { getStringDate } from '../../../libs/dayjs/getStringDate';
import { Attendance } from '../../../redux/modules/attendance';
import { Event } from '../../../redux/modules/event';
import { PracticeItem } from '../../../redux/modules/practice';
import { PracticeDetail as Presentational } from './PracticeDetail';

type Props = {
  event: Event;
  practice: PracticeItem;
  dateId: string;
  breakdownAttendances: {
    presence: Attendance[];
    undecided: Attendance[];
    absence: Attendance[];
  };
};
export const PracticeDetail: React.VFC<Props> = React.memo(
  ({ event, practice, dateId, breakdownAttendances }) => {
    const { modalRef, handleTogglePracticeModal, handleKeydown } = useModal();

    // TODO: memo化
    const titleDate = getStringDate(event.dates.find((date) => date.id === dateId)?.day);
    const titleDayOfTheWeek = getDayOfTheWeek(event.dates.find((date) => date.id === dateId)?.day);
    const url = practice.locations.find((loc) => loc.dateId === dateId)?.url;
    const content = practice.remarks.find((rmrk) => rmrk.dateId === dateId)?.content;

    return (
      <Presentational
        practice={practice}
        dateId={dateId}
        breakdownAttendances={breakdownAttendances}
        modalRef={modalRef}
        handleTogglePracticeModal={handleTogglePracticeModal}
        handleKeydown={handleKeydown}
        titleDate={titleDate}
        titleDayOfTheWeek={titleDayOfTheWeek}
        url={url}
        content={content}
      />
    );
  },
);
