// @ts-ignore
import config from "../config.json";
import axios, { AxiosResponse } from "axios";

export interface AuthDTO {
  email: string;
  password: string;
}

export class AuthCrud {
  public static async login(data: AuthDTO): Promise<AxiosResponse> {
    const response = await axios.post(`${config.API_URL}/login`, data);
    return response;
  }

  public static async register(data: AuthDTO): Promise<string> {
    const response = await axios.post(`${config.API_URL}/register`, data);
    return response.data;
  }
}
