export interface User {
  id: number;
  email: string;
  password: string;
  balance: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  budget: string;
  currentExpenses: string;
  freq: string;
}

export interface Record {
  id: number;
  recordDate: string;
  sum: string;
  desc: string | null;
  currBalance: string;
  category: Category | null;
}

export enum Frequency {
  DAILY,
  WEEKLY,
  BIWEEKLY,
  MONTHLY,
  YEARLY
}
