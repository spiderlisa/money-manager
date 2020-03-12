// @ts-ignore
import config from '../config.json';
import axios from 'axios';
import { User } from '../../models';

export class UserCrud {
  public static async getProfile(token: string): Promise<User> {
    const response = await axios.get(`${config.API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
}