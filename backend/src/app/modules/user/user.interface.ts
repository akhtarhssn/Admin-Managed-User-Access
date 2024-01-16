/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  userId: string;
  password: string;
  role?: string;
}

// Custom static methods:
export interface UserModel extends Model<IUser> {
  userExists(id: string): Promise<IUser | null>;
  isPasswordMatch(plainPass: string, hashedPass: string): Promise<boolean>;
  JwtIssueBeforePassChange(
    passwordChangedTimeStamp: Date,
    jwtIssueTimeStamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
