import React from 'react';
import { getRoleValue } from '../../../../libs/utils/getRoleValue';
import { Attendance } from '../../../../redux/modules/attendance';
import { Part } from '../../../../redux/modules/part';
import { ProgramItem } from '../../../../redux/modules/program';
import { RoleItem } from '../../../../redux/modules/role';
import { Heading } from '../../../uiParts/Heading';
import { PrimaryButton } from '../../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../../uiParts/SecondaryButton';
import styles from './index.module.scss';

type Props = {
  handleToggleSetting: () => void;
  programs: ProgramItem[];
  parts: Part[];
  attendances: Attendance[];
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  programId: string;
  roles: RoleItem[];
  handleChangeRadio: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeRole: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Role: React.VFC<Props> = ({
  handleToggleSetting,
  programs,
  parts,
  attendances,
  isLoading,
  handleUpdate,
  programId,
  roles,
  handleChangeRadio,
  handleChangeRole,
}) => {
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
