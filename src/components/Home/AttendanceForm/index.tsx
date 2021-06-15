import clsx from 'clsx';
import React from 'react';
import { useAttendance } from '../../../hooks/useAttendance';
import { useEvent } from '../../../hooks/useEvent';
import { useParts } from '../../../hooks/useParts';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { Badge } from '../../uiParts/Badge';
import { Heading } from '../../uiParts/Heading';
import { OptionalButton } from '../../uiParts/OptionalButton';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../uiParts/SecondaryButton';
import { Sectioning } from '../../uiParts/Sectioning';
import styles from './index.module.scss';

export const AttendanceForm: React.VFC = () => {
  const { event } = useEvent();
  const { parts } = useParts(event.id);
  const {
    attendance,
    handleChangeAttendance,
    handleChangeRemark,
    handleClickRadio,
    handleKeyDownRadio,
  } = useAttendance();

  return (
    <Sectioning id="attendance_form">
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>
            <Heading level={3} label="出欠登録フォーム" />
          </legend>
          <div className={styles.remark}>
            遅刻早退の場合は○を選択の上、
            <br />
            遅刻早退欄にコメントを記入ください
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="attendance_occupation" className={styles.label}>
              区分
              <Badge type="required" />
            </label>
            <select
              id="attendance_occupation"
              name="occupation"
              value={attendance.occupation}
              onChange={handleChangeAttendance}>
              <option value="working">社会人</option>
              <option value="student">学生</option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="attendance_part" className={styles.label}>
              パート
              <Badge type="required" />
            </label>
            <select
              id="attendance_part"
              name="part"
              value={attendance.part}
              onChange={handleChangeAttendance}>
              {parts.map((part) => (
                <option key={part.id} value={part.name}>
                  {part.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="attendance_name" className={styles.label}>
              名前
              <Badge type="required" />
            </label>
            <input
              type="text"
              id="attendance_name"
              name="name"
              value={attendance.name}
              className={clsx(styles.input, styles.text)}
              onChange={handleChangeAttendance}
            />
          </div>
          <ul className={styles.list}>
            {event.dates.map((date) => (
              <li key={date.id}>
                <fieldset className={styles.fieldset}>
                  <legend id={`attendance_group-${date.id}`}>
                    <span className={styles.label}>
                      {date.day}
                      {getDayOfTheWeek(date.day)} {date.time}
                    </span>
                  </legend>
                  <div
                    role="radiogroup"
                    aria-required
                    aria-labelledby={`attendance_group-${date.id}`}
                    className={styles.radiogroup}>
                    <Badge type="required" />
                    <span
                      role="radio"
                      id={`presence-${date.id}`}
                      aria-checked={
                        attendance.attendances.find((item) => item.dateId === date.id)
                          ?.attendance === 'presence'
                      }
                      aria-label="出席"
                      tabIndex={
                        attendance.attendances.find((item) => item.dateId === date.id)
                          ?.attendance === 'presence'
                          ? 0
                          : -1
                      }
                      className={clsx(styles.radio, styles.circle)}
                      onClick={handleClickRadio}
                      onKeyDown={handleKeyDownRadio}
                    />
                    <span
                      role="radio"
                      id={`undecided-${date.id}`}
                      aria-checked={
                        attendance.attendances.find((item) => item.dateId === date.id)
                          ?.attendance === 'undecided'
                      }
                      aria-label="未定"
                      tabIndex={
                        attendance.attendances.find((item) => item.dateId === date.id)
                          ?.attendance === 'undecided'
                          ? 0
                          : -1
                      }
                      className={clsx(styles.radio, styles.triangle)}
                      onClick={handleClickRadio}
                      onKeyDown={handleKeyDownRadio}
                    />
                    <span
                      role="radio"
                      id={`absence-${date.id}`}
                      aria-checked={
                        attendance.attendances.find((item) => item.dateId === date.id)
                          ?.attendance === 'absence'
                      }
                      aria-label="欠席"
                      tabIndex={
                        attendance.attendances.find((item) => item.dateId === date.id)
                          ?.attendance === 'absence'
                          ? 0
                          : -1
                      }
                      className={clsx(styles.radio, styles.cross)}
                      onClick={handleClickRadio}
                      onKeyDown={handleKeyDownRadio}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor={`attendance_remark-${date.id}`} className={styles.label}>
                      遅刻早退
                      <Badge type="optional" />
                    </label>
                    <input
                      type="text"
                      id={`attendance_remark-${date.id}`}
                      name="remark"
                      value={
                        attendance.attendances.find((item) => item.dateId === date.id)?.remark || ''
                      }
                      className={clsx(styles.input, styles.text)}
                      onChange={handleChangeRemark}
                    />
                  </div>
                </fieldset>
              </li>
            ))}
          </ul>
          <div className={styles.inputWrapper}>
            <label htmlFor="attendance_comment" className={styles.label}>
              コメント
              <Badge type="optional" />
            </label>
            <textarea
              name="comment"
              id="attendance_comment"
              value={attendance.comment}
              className={clsx(styles.input, styles.textarea)}
              onChange={handleChangeAttendance}
            />
          </div>
        </fieldset>
        <PrimaryButton
          type="submit"
          label="作成"
          disabled={false}
          handleClick={(e) => e.preventDefault()}
        />
        <SecondaryButton label="キャンセル" disabled={false} handleClick={() => {}} />
        <OptionalButton label="削除" disabled={false} handleClick={() => {}} />
      </form>
      <PrimaryButton type="button" label="出欠作成" disabled={false} handleClick={() => {}} />
    </Sectioning>
  );
};
