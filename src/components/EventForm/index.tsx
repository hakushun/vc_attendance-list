import React from 'react';
import { useEvent } from '../../hooks/useEvent';
import { useEvents } from '../../hooks/useEvents';
import { useShow } from '../../hooks/useShow';
import { EventForm as Presentational } from './EventForm';

export const EventForm: React.VFC = () => {
  const { eventFormIsShown, handleToggleEventForm } = useShow();
  const {
    event,
    handleChangeText,
    handleCangeDay,
    handleCangeTime,
    handleAddDateForm,
    handleDeleteDateForm,
  } = useEvent();
  const { isLoading, handleCreate, handleUpdate, handleRemove } = useEvents();

  return (
    <Presentational
      eventFormIsShown={eventFormIsShown}
      handleToggleEventForm={handleToggleEventForm}
      event={event}
      handleChangeText={handleChangeText}
      handleCangeDay={handleCangeDay}
      handleCangeTime={handleCangeTime}
      handleAddDateForm={handleAddDateForm}
      handleDeleteDateForm={handleDeleteDateForm}
      isLoading={isLoading}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleRemove={handleRemove}
    />
  );
};
