// @ts-ignore
import config from '../config.json';
import axios from 'axios';
import { Record } from '../../models';
import { fromSecondsToText } from '@/utils/date';

export class JournalCrud {
  public static async getJournal(token: string): Promise<Record[]> {
    const response = await axios.get(`${config.API_URL}/journal`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data) {
      const result: Record[] = [];
      response.data.forEach((record: any) => {
        result.push({
          ...record,
          recordDate: fromSecondsToText(record.recordDate)
        });
      });
      return result;
    }

    return response.data;
  }
}