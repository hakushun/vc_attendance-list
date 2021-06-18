import React from 'react';
import { useEvent } from '../../../hooks/useEvent';
import { useModal } from '../../../hooks/useModal';
import { usePractice } from '../../../hooks/usePractice';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { getStringDate } from '../../../libs/dayjs/getStringDate';
import { Heading } from '../../uiParts/Heading';
import { Modal } from '../../uiParts/Modal';
import { SecondaryButton } from '../../uiParts/SecondaryButton';
import { StringWithUrl } from '../../uiParts/StringWithUrl';
import styles from './index.module.scss';

export const PracticeDetail: React.VFC = () => {
  const { practiceModalIsShown, handleTogglePracticeModal } = useModal();
  const { event } = useEvent();
  const { practice, dateId } = usePractice(event.id);

  const titleDate = getStringDate(event.dates.find((date) => date.id === dateId)?.day);
  const titleDayOfTheWeek = getDayOfTheWeek(event.dates.find((date) => date.id === dateId)?.day);
  const url = practice.locations.find((loc) => loc.dateId === dateId)?.url;
  const content = practice.remarks.find((rmrk) => rmrk.dateId === dateId)?.content;

  return (
    <>
      {practiceModalIsShown && (
        <Modal>
          <div className={styles.root}>
            <Heading level={3} label={`${titleDate}${titleDayOfTheWeek}の詳細`} />
            <dl className={styles.list}>
              <div className={styles.item}>
                <dt className={styles.term}>施設1</dt>
                <dd className={styles.definition}>
                  {practice.locations.find((loc) => loc.dateId === dateId)?.name1 || '未入力'}
                </dd>
              </div>
              <div className={styles.item}>
                <dt className={styles.term}>施設2</dt>
                <dd className={styles.definition}>
                  {practice.locations.find((loc) => loc.dateId === dateId)?.name2 || '未入力'}
                </dd>
              </div>
              <div className={styles.item}>
                <dt className={styles.term}>URL</dt>
                <dd className={styles.definition}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  ) : (
                    '未入力'
                  )}
                </dd>
              </div>
              <div className={styles.item}>
                <dt className={styles.term}>区分</dt>
                <dd className={styles.definition}>
                  {practice.plans.find((pln) => pln.dateId === dateId)?.category || '未入力'}
                </dd>
              </div>
              <div className={styles.item}>
                <dt className={styles.term}>スケジュール</dt>
                <dd className={styles.definition}>
                  {practice.plans.find((pln) => pln.dateId === dateId)?.schedule || '未入力'}
                </dd>
              </div>
              <div className={styles.item}>
                <dt className={styles.term}>備考</dt>
                <dd className={styles.definition}>
                  {content ? <StringWithUrl content={content} /> : '未入力'}
                </dd>
              </div>
            </dl>
            <SecondaryButton
              label="閉じる"
              disabled={false}
              handleClick={handleTogglePracticeModal}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
