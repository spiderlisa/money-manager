export class User {
  public id: number = 0;
  public email: string = '';
  private password: string = '';
  public balance: string = '';
  public categories: Category[] = [];

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}

export class Category {
  public id: number = 0;
  public name: string = '';
  public budget: string = '';
  public currentExpenses: string = '';
  public freq: string = '';


  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}

export class Record {
  public id: number = 0;
  public recordDate: string = '';
  public sum: string = '';
  public desc: string | null = null;
  public currBalance: string = '';
  public category: Category | null = null;

  constructor(data: Partial<Record>) {
    Object.assign(this, data);
  }
}

export enum Frequency {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  BIWEEKLY = 'Bi-weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly'
}