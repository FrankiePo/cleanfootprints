export interface IUser {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  calculator_data?: {
    birthdays?: number[];
    private_recycling?: any;
  }
}
