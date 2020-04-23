// @ts-ignore
import config from "../config.json";
import axios from "axios";
import { Category } from "../../models";

export interface CategoryDTO {
  name: string;
  budget: string;
  freq: string;
}

export class CategoryCrud {
  public static async addCategory(
    categoryData: CategoryDTO,
    token: string
  ): Promise<Category[]> {
    const response = await axios.post(
      `${config.API_URL}/categories`,
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  public static async updateCategory(
    categoryId: number,
    categoryData: CategoryDTO,
    token: string
  ): Promise<Category[]> {
    const response = await axios.put(
      `${config.API_URL}/categories/${categoryId}`,
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  public static async getCategories(token: string): Promise<Category[]> {
    const response = await axios.get(`${config.API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
}
