// @ts-ignore
import config from "../config.json";
import axios from "axios";
import { User } from "../../models";

export interface PasswordChangeDTO {
  oldPassword: string;
  newPassword: string;
}

export class UserCrud {
  public static async getProfile(token: string): Promise<User> {
    const response = await axios.get(`${config.API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  public static async updatePassword(
    token: string,
    data: PasswordChangeDTO
  ): Promise<User> {
    const response = await axios.post(`${config.API_URL}/newPassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}
