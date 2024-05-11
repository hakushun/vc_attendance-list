import clsx from 'clsx';
import React from 'react';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { isAttendanceInvalid } from '../../../libs/utils/isAttendanceInvalid';
import { Attendance } from '../../../redux/modules/app/attendance';
import { Event } from '../../../redux/modules/app/event';
import { Part } from '../../../redux/modules/app/part';
import { Userdata } from '../../../redux/modules/app/user';
import { ProgramItem } from '../../../redux/modules/app/program';
import { PracticeItem } from '../../../redux/modules/domain/practice';
import { Badge } from '../../uiParts/Badge';
import { Heading } from '../../uiParts/Heading';
import { OptionalButton } from '../../uiParts/OptionalButton';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../uiParts/SecondaryButton';
import { Sectioning } from '../../uiParts/Sectioning';
import styles from './index.module.scss';
import { RoleItem } from '../../../redux/modules/app/role';

type Props = {
  user: Userdata;
  event: Event;
  parts: Part[];
  programs: ProgramItem[];
  attendances: Attendance[];
  practice: PracticeItem;
  isLoading: boolean;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleRemove: () => void;
  attendance: Attendance;
  handleChangeAttendance: (
    _e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleChangeRemark: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickRadio: (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  handleKeyDownRadio: (_e: React.KeyboardEvent<HTMLSpanElement>) => void;
  role: RoleItem;
  handleChangeRole: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  attendanceRef: React.MutableRefObject<HTMLHeadingElement | null>;
  attendanceFormIsShown: boolean;
  handleToggleAttendanceForm: () => void;
};
export const AttendanceForm: React.VFC<Props> = React.memo(
  ({
    user,
    event,
    parts,
    programs,
    attendances,
    practice,
    isLoading,
    handleCreate,
    handleUpdate,
    handleRemove,
    attendance,
    handleChangeAttendance,
    handleChangeRemark,
    handleClickRadio,
    handleKeyDownRadio,
    role,
    handleChangeRole,
    attendanceRef,
    attendanceFormIsShown,
    handleToggleAttendanceForm,
  }) => {
    return (
      <Sectioning id="attendance_form">
        {attendanceFormIsShown && (
          <form className={styles.form}>
            <fieldset className={styles.fieldset}>
              <legend>
                <Heading level={3} label="出欠登録フォーム" ref={attendanceRef} />
              </legend>
              <div className={styles.remark}>
                遅刻・早退・未定の場合は、 遅刻・早退・未定詳細欄にコメントを記入ください
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="attendance_occupation" className={styles.label}>
                  区分
                  <Badge type="required" />
                </label>
                <select
                  id="attendance_occupation"
                  name="occupation"
                  required
                  aria-required
                  disabled={isLoading}
                  value={attendance.occupation}
                  className={styles.select}
                  onChange={handleChangeAttendance}>
                  <option value="">選択して下さい</option>
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
                  required
                  aria-required
                  disabled={isLoading}
                  value={attendance.part}
                  className={styles.select}
                  onChange={handleChangeAttendance}>
                  <option value="">選択して下さい</option>
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
                  required
                  aria-required
                  maxLength={30}
                  placeholder="フルネームを入力下さい"
                  autoComplete="off"
                  disabled={isLoading}
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
                          {getDayOfTheWeek(date.day)} {date.time}[
                          {practice.plans.find((plan) => plan.dateId === date.id)?.category}]
                        </span>
                      </legend>
                      <div
                        role="radiogroup"
                        aria-required
                        aria-labelledby={`attendance_group-${date.id}`}
                        className={styles.radiogroup}>
                        <Badge type="required" />
                        <div className={styles.radiogroupInner}>
                          <div className={styles.radioRow}>
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
                          <div className={styles.radioRow}>
                            <span
                              role="radio"
                              id={`late-${date.id}`}
                              aria-checked={
                                attendance.attendances.find((item) => item.dateId === date.id)
                                  ?.attendance === 'late'
                              }
                              tabIndex={
                                attendance.attendances.find((item) => item.dateId === date.id)
                                  ?.attendance === 'late'
                                  ? 0
                                  : -1
                              }
                              className={clsx(styles.radio)}
                              onClick={handleClickRadio}
                              onKeyDown={handleKeyDownRadio}>
                              遅刻
                            </span>
                            <span
                              role="radio"
                              id={`leavingEarly-${date.id}`}
                              aria-checked={
                                attendance.attendances.find((item) => item.dateId === date.id)
                                  ?.attendance === 'leavingEarly'
                              }
                              tabIndex={
                                attendance.attendances.find((item) => item.dateId === date.id)
                                  ?.attendance === 'leavingEarly'
                                  ? 0
                                  : -1
                              }
                              className={clsx(styles.radio)}
                              onClick={handleClickRadio}
                              onKeyDown={handleKeyDownRadio}>
                              早退
                            </span>
                            <span
                              role="radio"
                              id={`undecided-${date.id}`}
                              aria-checked={
                                attendance.attendances.find((item) => item.dateId === date.id)
                                  ?.attendance === 'undecided'
                              }
                              tabIndex={
                                attendance.attendances.find((item) => item.dateId === date.id)
                                  ?.attendance === 'undecided'
                                  ? 0
                                  : -1
                              }
                              className={clsx(styles.radio)}
                              onClick={handleClickRadio}
                              onKeyDown={handleKeyDownRadio}>
                              未定
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor={`attendance_remark-${date.id}`} className={styles.label}>
                          遅刻・早退・未定詳細
                          <Badge type="optional" />
                        </label>
                        <input
                          type="text"
                          id={`attendance_remark-${date.id}`}
                          name="remark"
                          autoComplete="off"
                          maxLength={40}
                          disabled={isLoading}
                          value={
                            attendance.attendances.find((item) => item.dateId === date.id)
                              ?.remark || ''
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
                  その他コメント
                  <Badge type="optional" />
                </label>
                <textarea
                  name="comment"
                  id="attendance_comment"
                  maxLength={200}
                  disabled={isLoading}
                  value={attendance.comment}
                  className={clsx(styles.input, styles.textarea)}
                  onChange={handleChangeAttendance}
                />
              </div>
              {programs.length > 0 && (
                <fieldset className={styles.fieldset}>
                  <legend>
                    <Heading level={4} label="各曲パート(1st,2ndなど) ※管打楽器は必須" />
                  </legend>
                  <ul className={styles.list}>
                    {programs.map((program) => (
                      <li key={program.id} className={styles.programItem}>
                        <label htmlFor={program.id} className={styles.label}>
                          {program.name}
                        </label>
                        <input
                          type="text"
                          name={program.id}
                          id={program.id}
                          value={role[program.id] ?? ''}
                          onChange={handleChangeRole}
                          className={clsx(styles.input, styles.text)}
                        />
                      </li>
                    ))}
                  </ul>
                </fieldset>
              )}
            </fieldset>
            <PrimaryButton
              type="submit"
              label={
                attendances.some((item) => item.userId === attendance.userId)
                  ? '出欠の更新'
                  : '出欠の作成'
              }
              disabled={isLoading || isAttendanceInvalid(attendance)}
              handleClick={
                attendances.some((item) => item.userId === attendance.userId)
                  ? handleUpdate
                  : handleCreate
              }
            />
            <SecondaryButton
              label="キャンセル"
              disabled={isLoading}
              handleClick={handleToggleAttendanceForm}
            />
            {attendances.some((item) => item.userId === attendance.userId) && (
              <OptionalButton label="削除" disabled={isLoading} handleClick={handleRemove} />
            )}
          </form>
        )}
        {/* すでに出欠作成済のユーザには表示しない */}
        {!attendanceFormIsShown && !attendances.some((item) => item.userId === user?.id) && (
          <PrimaryButton
            type="button"
            label="出欠作成"
            disabled={isLoading}
            handleClick={handleToggleAttendanceForm}
          />
        )}
      </Sectioning>
    );
  },
);
