import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { Attendance, AttendanceItem } from '../../redux/modules/app/attendance';
import { Event } from '../../redux/modules/app/event';
import { CreatePayload } from '../../redux/modules/domain/events';
import { getInstance } from './getInstance';

const db = getInstance();

export const fetchEvent = async (id: string): Promise<Event> => {
  const docRef = doc(db, 'events', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Event;
};

export const createEvent = async (event: CreatePayload): Promise<Event> => {
  const docRef = doc(collection(db, 'events'));
  const { id } = docRef;
  await setDoc(docRef, { ...event, id });
  return fetchEvent(id);
};

const getCurrentAttendances = async (event: Event) => {
  const querySnapshot = await getDocs(collection(db, 'attendances', event.id, 'attendance'));
  const result: Attendance[] = [];
  querySnapshot.forEach((docSnapshot) => {
    result.push(docSnapshot.data() as Attendance);
  });
  return result;
};

const generateNewAttendances = (event: Event, attendances: Attendance[]) => {
  const result = attendances.map((attendance) => ({
    ...attendance,
    attendances: event.dates.reduce<AttendanceItem[]>((acc, date) => {
      if (attendance.attendances.some((item) => item.dateId === date.id)) {
        acc.push(attendance.attendances.find((item) => item.dateId === date.id)!);
        return acc;
      }
      acc.push({ dateId: date.id, attendance: 'presence', remark: '' });
      return acc;
    }, []),
  }));
  return result;
};

export const updateEvent = async (event: Event): Promise<Event> => {
  const docRef = doc(db, 'events', event.id);
  await setDoc(docRef, event, { merge: true });

  // 追加になった日時に紐づくpracticeを作成
  await Promise.all(
    event.dates.map((date) => {
      const practice = {
        location: { dateId: date.id },
        plan: { dateId: date.id },
        remark: { dateId: date.id },
      };
      const practiceDocRef = doc(db, 'practices', event.id, 'practice', date.id);
      return setDoc(practiceDocRef, practice, { merge: true });
    }),
  );

  // 追加/削除になっ練習日時に紐づくattendanceを追加/削除
  // 登録されてる出欠の数が多いと処理の負荷が増大
  const currentAttendances = await getCurrentAttendances(event);
  const newAttendances = generateNewAttendances(event, currentAttendances);
  await Promise.all(
    newAttendances.map((item) => {
      const attendanceDocRef = doc(db, 'attendances', event.id, 'attendance', item.userId);
      return setDoc(attendanceDocRef, item, { merge: true });
    }),
  );
  return fetchEvent(event.id!);
};

export const removeEvent = async (event: Event): Promise<void> => {
  await deleteDoc(doc(db, 'events', event.id));
  await deleteDoc(doc(db, 'parts', event.id));
  await Promise.all(
    event.dates.map((date) => deleteDoc(doc(db, 'practices', event.id, 'practice', date.id))),
  );
  await deleteDoc(doc(db, 'programs', event.id));
  await deleteDoc(doc(db, 'roles', event.id));
};
