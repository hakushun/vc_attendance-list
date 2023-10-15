import { EventAttributes, createEvents } from 'ics';
import { Date, Event } from '../redux/modules/app/event';

type Hooks = {
  downloadCalendar: () => Promise<void>;
};
export const useCalendar = (event: Event): Hooks => {
  const generateEventAttributesArray = (_event: Event): EventAttributes[] => {
    function getDayNumbers(date: Date): [number, number, number] {
      return [
        parseInt(date.day.split('-')[0], 10),
        parseInt(date.day.split('-')[1], 10),
        parseInt(date.day.split('-')[2], 10),
      ];
    }
    function getStartTimeNumbers(date: Date): [number, number] {
      return [
        parseInt(date.time.split('~')[0].split(':')[0], 10),
        parseInt(date.time.split('~')[0].split(':')[1], 10),
      ];
    }
    function getEndTimeNumbers(date: Date): [number, number] {
      return [
        parseInt(date.time.split('~')[1].split(':')[0], 10),
        parseInt(date.time.split('~')[1].split(':')[1], 10),
      ];
    }
    const result = _event.dates.map<EventAttributes>((date) => ({
      // TODO: タイトルの埋め込み
      title: 'FO練習',
      // TODO : NaNになったときの処理
      start: [...getDayNumbers(date), ...getStartTimeNumbers(date)],
      end: [...getDayNumbers(date), ...getEndTimeNumbers(date)],
    }));
    return result;
  };

  const downloadCalendar = async () => {
    const events = generateEventAttributesArray(event);
    const fileName = `${event.title}.ics`;
    const file = await new Promise<File>((resolve, reject) => {
      createEvents(events, (error, value) => {
        if (error) reject(error);
        resolve(new File([value], fileName, { type: 'text/calendar' }));
      });
    });
    const url = URL.createObjectURL(file);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  };

  return { downloadCalendar };
};
