import clsx from 'clsx';
import React from 'react';
import { useEvent } from '../../../hooks/useEvent';
import { useEvents } from '../../../hooks/useEvents';
import { useShow } from '../../../hooks/useShow';
import { Badge } from '../../uiParts/Badge';
import { Heading } from '../../uiParts/Heading';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../uiParts/SecondaryButton';
import { Sectioning } from '../../uiParts/Sectioning';
import { TernaryButton } from '../../uiParts/TernaryButton';
import styles from './index.module.scss';

export const EventForm: React.VFC = () => {
  const { eventFormIsShown, handleToggleEventForm } = useShow();
  const {
    eventTitle,
    eventDetail,
    eventDates,
    handleChangeText,
    handleCangeDay,
    handleCangeTime,
    handleAddDateForm,
    handleDeleteDateForm,
  } = useEvent();
  const { isLoading, handleCreate } = useEvents();

  return (
    <Sectioning id="event_form">
      {eventFormIsShown ? (
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <legend>
              <Heading level={2} label="イベント作成フォーム" />
            </legend>
            <div className={styles.inputWrapper}>
              <label htmlFor="event_title" className={styles.label}>
                イベント名
                <Badge type="required" />
              </label>
              <input
                type="text"
                name="title"
                id="event_title"
                required
                aria-required
                maxLength={30}
                placeholder="イベント名を入力ください"
                autoComplete="off"
                disabled={isLoading}
                value={eventTitle}
                onChange={handleChangeText}
                className={clsx(styles.input, styles.text)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="event_detail" className={styles.label}>
                イベント詳細
                <Badge type="optional" />
              </label>
              <textarea
                id="event_detail"
                name="detail"
                maxLength={1000}
                placeholder="イベント詳細を入力ください"
                disabled={isLoading}
                value={eventDetail}
                onChange={handleChangeText}
                className={clsx(styles.input, styles.textarea)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.label}>
                  練習日時
                  <Badge type="required" />
                </legend>
                <ul className={styles.list}>
                  {eventDates.map((date, index) => (
                    <li key={date.id} className={styles.item}>
                      <div className={styles.dateWrapper}>
                        <label htmlFor={`event_day-${index}`} className={styles.label}>
                          日付 {index + 1}
                        </label>
                        <input
                          type="date"
                          id={`event_day-${index}`}
                          required
                          aria-required
                          disabled={isLoading}
                          value={eventDates[index].day}
                          onChange={handleCangeDay}
                          className={clsx(styles.input, styles.date)}
                        />
                      </div>
                      <div className={styles.dateWrapper}>
                        <label htmlFor={`event_time-${index}`} className={styles.label}>
                          時間 {index + 1}
                        </label>
                        <input
                          type="text"
                          id={`event_time-${index}`}
                          required
                          aria-required
                          maxLength={15}
                          placeholder={`日付 ${index + 1}の練習時間を入力ください`}
                          disabled={isLoading}
                          value={eventDates[index].time}
                          onChange={handleCangeTime}
                          className={clsx(styles.input, styles.date)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className={styles.action}>
                  <TernaryButton label="追加" handleClick={handleAddDateForm} />
                  <TernaryButton label="削除" handleClick={handleDeleteDateForm} />
                </div>
              </fieldset>
            </div>
          </fieldset>
          <PrimaryButton
            type="submit"
            label="イベントの登録"
            disabled={isLoading}
            handleClick={handleCreate}
          />
          <SecondaryButton label="キャンセル" handleClick={handleToggleEventForm} />
        </form>
      ) : (
        <PrimaryButton
          type="button"
          label="ボタン"
          disabled={false}
          handleClick={handleToggleEventForm}
        />
      )}
    </Sectioning>
  );
};
