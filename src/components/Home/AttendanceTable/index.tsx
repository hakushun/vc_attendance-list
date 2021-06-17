import clsx from 'clsx';
import React from 'react';
import { useAttendance } from '../../../hooks/useAttendance';
import { useAttendances } from '../../../hooks/useAttendances';
import { useEvent } from '../../../hooks/useEvent';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { convertAttendance } from '../../../libs/utils/convertAttendance';
import { convertOccuoation } from '../../../libs/utils/convertOccupation';
import { Heading } from '../../uiParts/Heading';
import { Loading } from '../../uiParts/Loading';
import { Sectioning } from '../../uiParts/Sectioning';
import styles from './index.module.scss';

export const AttendanceTable: React.VFC = () => {
  const { event } = useEvent();
  const { handleFocusAttendance } = useAttendance();
  const { attendances, isLoading } = useAttendances(event.id);

  if (isLoading) return <Loading />;

  return (
    <Sectioning id="attendance_table">
      <Heading level={3} label={`${event.title}の出欠表`} />
      <ul className={styles.remarks}>
        <li>※出欠作成後の編集は、名前を選択してください</li>
        <li>※練習場所・内容の確認は、日付を選択してください</li>
        <li>※遅刻早退コメントの確認は、〇△×を選択してください</li>
      </ul>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={clsx(styles.cell, styles.head, styles.narrow)}>パート</th>
              <th className={clsx(styles.cell, styles.head)}>名前</th>
              {event.dates.map((date) => (
                <th key={date.id} className={clsx(styles.cell, styles.head, styles.midium)}>
                  <button type="button" className={styles.action} onClick={(e) => console.log(e)}>
                    {date.day}
                    {getDayOfTheWeek(date.day)}
                  </button>
                  <span>{date.time}</span>
                </th>
              ))}
              <th className={clsx(styles.cell, styles.head, styles.wide)}>コメント</th>
              <th className={clsx(styles.cell, styles.head, styles.narrow)}>区分</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr
                key={attendance.userId}
                onClick={(e) => e.currentTarget.classList.toggle('highlight')}>
                <td className={clsx(styles.cell, styles.body, styles.narrow)}>{attendance.part}</td>
                <td className={clsx(styles.cell, styles.body)}>
                  <button
                    type="button"
                    className={styles.action}
                    onClick={(e) => handleFocusAttendance(e, attendance)}>
                    {attendance.name}
                  </button>
                </td>
                {attendance.attendances.map((item) => (
                  <td key={item.dateId} className={clsx(styles.cell, styles.body, styles.midium)}>
                    {item.remark ? (
                      <button type="button" className={styles.action}>
                        {convertAttendance(item.attendance)}
                      </button>
                    ) : (
                      convertAttendance(item.attendance)
                    )}
                  </td>
                ))}
                <td className={clsx(styles.cell, styles.body, styles.wide)}>
                  {attendance.comment}
                </td>
                <td className={clsx(styles.cell, styles.body, styles.narrow)}>
                  {convertOccuoation(attendance.occupation)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sectioning>
  );
};
