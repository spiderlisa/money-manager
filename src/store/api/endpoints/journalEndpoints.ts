// @ts-ignore
import config from '../config.json';
import axios from 'axios';
import { Record } from '../../models';

export class JournalCrud {
  public static async getJournal(token: string): Promise<Record[]> {
    const response = await axios.get(`${config.API_URL}/journal`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
}