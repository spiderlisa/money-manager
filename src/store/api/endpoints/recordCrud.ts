// @ts-ignore
import config from '../config.json';
import axios from 'axios';
import { Record } from '@/store/models';

export interface ExpenseDTO {
  sum: number,
  recordDate: string,
  desc?: string
}

export class RecordCrud {
  public static async addExpense(expenseData: ExpenseDTO, categoryId: number, token: string): Promise<Record> {
    const response = await axios.post(`${config.API_URL}/categories/${categoryId}/expenses`, expenseData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  public static async addIncome(amount: number, token: string): Promise<Record> {
    const incomeData = {
      addSum: amount
    };
    const response = await axios.put(`${config.API_URL}/profile`, incomeData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
}