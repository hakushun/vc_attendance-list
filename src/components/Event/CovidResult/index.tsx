import React from 'react';
import { useModal } from '../../../hooks/useModal';
import { Attendance } from '../../../redux/modules/attendance';
import { Covid } from '../../../redux/modules/covid';
import { CovidResult as Presentational } from './CovidResult';

type Props = {
  isLoading: boolean;
  answerRuselt: (Covid & { name: string | undefined; part: string | undefined })[];
  unasweredUsers: Attendance[];
};
export const CovidResult: React.VFC<Props> = ({ isLoading, answerRuselt, unasweredUsers }) => {
  const { modalRef, handleToggleCovidResult, handleKeydown } = useModal();

  return (
    <Presentational
      isLoading={isLoading}
      answerRuselt={answerRuselt}
      unasweredUsers={unasweredUsers}
      modalRef={modalRef}
      handleToggleCovidResult={handleToggleCovidResult}
      handleKeydown={handleKeydown}
    />
  );
};
