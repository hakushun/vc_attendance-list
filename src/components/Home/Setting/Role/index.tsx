import React from 'react';
import { useAttendances } from '../../../../hooks/useAttendances';
import { useParts } from '../../../../hooks/useParts';
import { usePrograms } from '../../../../hooks/usePrograms';
import { useRole } from '../../../../hooks/useRole';
import { useRoles } from '../../../../hooks/useRoles';
import { getRoleValue } from '../../../../libs/utils/getRoleValue';
import { Event } from '../../../../redux/modules/event';
import { Heading } from '../../../uiParts/Heading';
import { PrimaryButton } from '../../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../../uiParts/SecondaryButton';
import styles from './index.module.scss';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
};
export const Role: React.VFC<Props> = ({ event, handleToggleSetting }) => {
  const { programs } = usePrograms(event.id);
  const { parts } = useParts(event.id);
  const { attendances } = useAttendances(event.id);
  const { programId, roles, handleChangeRadio, handleChangeRole } = useRole();
  const { isLoading, handleUpdate } = useRoles(event.id);

  return (
    <>
      <Heading level={3} label="乗り番 登録フォーム" />
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>プログラムの選択</legend>
          <ul role="radiogroup" aria-required className={styles.list}>
            {programs.map((program) => (
              <li key={program.id} className={styles.radioWrapper}>
                <input
                  type="radio"
                  id={`role-${program.id}`}
                  name="role_program"
                  value={program.id}
                  disabled={isLoading}
                  className={styles.radio}
                  onChange={handleChangeRadio}
                />
                <label htmlFor={`role-${program.id}`} className={styles.radioLabel}>
                  {program.name}
                </label>
              </li>
            ))}
          </ul>
          <fieldset className={styles.fieldset}>
            <legend>の乗り番入力</legend>
            <ul className={styles.list}>
              {parts.map((part) => (
                <li key={part.id}>
                  <details>
                    <summary className={styles.summary}>{part.name}</summary>
                    <ul className={styles.wrapper}>
                      {attendances.map(
                        (attendance) =>
                          attendance.part === part.name && (
                            <li key={attendance.userId} className={styles.inputWrapper}>
                              <label htmlFor={`role-${attendance.userId}`} className={styles.label}>
                                {attendance.name}
                              </label>
                              <input
                                type="text"
                                id={`role-${attendance.userId}`}
                                maxLength={20}
                                autoComplete="off"
                                disabled={isLoading}
                                value={getRoleValue(roles, attendance.userId, programId)}
                                className={styles.input}
                                onChange={handleChangeRole}
                              />
                            </li>
                          ),
                      )}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </fieldset>
        </fieldset>
        <PrimaryButton
          type="submit"
          label="乗り番の登録"
          disabled={isLoading}
          handleClick={handleUpdate}
        />
        <SecondaryButton
          label="キャンセル"
          disabled={isLoading}
          handleClick={handleToggleSetting}
        />
      </form>
    </>
  );
};
