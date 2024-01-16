/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "./user.model";

const createUser = async (payload: { userId: number; password: string }) => {
  const result = await User.create(payload);

  return result;
};

export const UserServices = {
  createUser,
};
