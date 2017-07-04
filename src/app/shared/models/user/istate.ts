import { IUser } from './iuser';
export interface IState {
  is_authenticated: boolean;
  user?: IUser;
}
