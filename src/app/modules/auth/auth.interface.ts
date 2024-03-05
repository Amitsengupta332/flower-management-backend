import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface IUser {
  userName: string;
  email: string;
  password: string;
  role?: 'manager' | 'seller' | 'user';
}
export type TUserRole = keyof typeof USER_ROLE;

export type ILoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    plainTextPassword: string,
    // eslint-disable-next-line no-unused-vars
    hashPassword: string,
  ): Promise<boolean>;
}
