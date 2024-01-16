import httpStatus from "http-status";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import { CreateToken } from "./auth.utils";

const loginUser = async (payload: ILoginUser) => {
  // check if the user exists
  // const isUserExist = await User.findOne({ id: payload?.id });
  const isUserExist = await User.userExists(payload?.userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found !");
  }

  // throw error if password not matches:
  if (!payload?.password || !isUserExist?.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }
  const isPasswordMatch = await User.isPasswordMatch(
    payload?.password,
    isUserExist?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match");
  }

  // create token and sent to the client
  const jwtPayload = {
    userId: isUserExist?.userId,
    role: isUserExist?.role,
  };

  const accessToken = CreateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );

  // Access Granted: Send AccessToken, RefreshToken
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
