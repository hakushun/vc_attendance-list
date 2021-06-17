import clsx from 'clsx';
import React from 'react';
import { useAttendance } from '../../../hooks/useAttendance';
import { useAttendances } from '../../../hooks/useAttendances';
import { useEvent } from '../../../hooks/useEvent';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { convertAttendance } from '../../../libs/utils/convertAttendance';
import { convertOccuoation } from '../../../libs/utils/convertOccupation';
import { hideColumns } from '../../../libs/utils/hideColumns';
import { showAllColumns } from '../../../libs/utils/showAllColumns';
import { toggleAttendanceRemark } from '../../../libs/utils/toggleAttendanceRemark';
import { exportToExcel } from '../../../libs/xlsx/exportToExcel';
import { Heading } from '../../uiParts/Heading';
import { Loading } from '../../uiParts/Loading';
import { OptionalButton } from '../../uiParts/OptionalButton';
import { Sectioning } from '../../uiParts/Sectioning';
import { TernaryButton } from '../../uiParts/TernaryButton';
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
        <table id="xlsx_table" className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <td className={clsx(styles.cell, styles.narrow, styles.button)}>
                <OptionalButton label="export" disabled={false} handleClick={exportToExcel} />
              </td>
              <td className={clsx(styles.cell, styles.button)}>
                <TernaryButton label="全列表示" disabled={false} handleClick={showAllColumns} />
              </td>
              {event.dates.map((date) => (
                <td
                  key={date.id}
                  className={clsx(styles.cell, styles.button)}
                  data-columns={`columns-${date.id}`}>
                  <TernaryButton label="列の非表示" disabled={false} handleClick={hideColumns} />
                </td>
              ))}
            </tr>
            <tr>
              <th className={clsx(styles.cell, styles.head, styles.narrow)}>パート</th>
              <th className={clsx(styles.cell, styles.head)}>名前</th>
              {event.dates.map((date) => (
                <th
                  key={date.id}
                  className={clsx(styles.cell, styles.head, styles.medium)}
                  data-columns={`columns-${date.id}`}>
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
                  <td
                    key={item.dateId}
                    className={clsx(styles.cell, styles.body, styles.medium)}
                    data-columns={`columns-${item.dateId}`}>
                    {item.remark ? (
                      <>
                        <button
                          type="button"
                          onClick={toggleAttendanceRemark}
                          className={styles.action}>
                          {convertAttendance(item.attendance)}
                        </button>
                        <div className={styles.remark} data-type="remark" data-is-shown="false">
                          {item.remark}
                        </div>
                      </>
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
