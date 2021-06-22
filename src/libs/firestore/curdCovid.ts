import { Covid } from '../../redux/modules/covid';
import { CreatePayload, FetchPayload } from '../../redux/modules/covids';
import { getTimestamp } from '../dayjs/getTimestap';
import { getInstance } from './getInstance';

const db = getInstance();

export const fetchCovid = async ({ eventId, dateId }: FetchPayload): Promise<Covid[] | null> => {
  try {
    const snapshot = await db
      .collection('covids')
      .doc(eventId)
      .collection('dates')
      .doc(dateId)
      .collection('covid')
      .get();
    const result: Covid[] = [];
    snapshot.forEach((doc) => result.push(doc.data() as Covid));
    return result;
  } catch (err) {
    alert(err);
    return null;
  }
};

export const createCovid = async ({ eventId, covid }: CreatePayload): Promise<void> => {
  try {
    await db
      .collection('covids')
      .doc(eventId)
      .collection('dates')
      .doc(covid.dateId)
      .collection('covid')
      .doc(covid.userId)
      .set({ ...covid, timestamp: getTimestamp() }, { merge: true });
  } catch (err) {
    alert(err);
  }
};
