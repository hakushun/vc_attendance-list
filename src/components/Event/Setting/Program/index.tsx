import React from 'react';
import { useProgram } from '../../../../hooks/useProgram';
import { isProgramInvalid } from '../../../../libs/utils/isProgramInvalid';
import { Event } from '../../../../redux/modules/event';
import { Badge } from '../../../uiParts/Badge';
import { Heading } from '../../../uiParts/Heading';
import { Loading } from '../../../uiParts/Loading';
import { PrimaryButton } from '../../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../../uiParts/SecondaryButton';
import { TernaryButton } from '../../../uiParts/TernaryButton';
import styles from './index.module.scss';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Program: React.VFC<Props> = ({
  event,
  handleToggleSetting,
  isLoading,
  handleUpdate,
}) => {
  const { program, handleChange, handleAddProgramForm, handleDeleteProgramForm } = useProgram();

  if (isLoading) return <Loading />;

  return (
    <>
      <Heading level={3} label="プログラム 登録フォーム" />
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>{event.title}のプログラム登録</legend>
          <ul className={styles.list}>
            {program.map((item, index) => (
              <li key={item.id}>
                <div className={styles.inputWrapper}>
                  <label htmlFor={`program-${item.id}`} className={styles.label}>
                    曲目{index + 1}:
                    <Badge type="required" />
                  </label>
                  <input
                    type="text"
                    id={`program-${item.id}`}
                    required
                    aria-required
                    maxLength={30}
                    autoComplete="off"
                    disabled={isLoading}
                    value={program.find((prog) => prog.id === item.id)?.name || ''}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.action}>
            <TernaryButton label="追加" disabled={isLoading} handleClick={handleAddProgramForm} />
            <TernaryButton
              label="削除"
              disabled={isLoading}
              handleClick={handleDeleteProgramForm}
            />
          </div>
        </fieldset>
        <PrimaryButton
          type="submit"
          label="プログラムの登録"
          disabled={isLoading || isProgramInvalid(program)}
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
