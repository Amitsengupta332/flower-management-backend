import httpStatus from 'http-status';
import { ILoginUser, IUser } from './auth.interface';
import { User } from './auth.model';
import AppError from '../../errors/AppError';
import config from '../../config';
import { createToken } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';

const registerUserIntoDB = async (payload: IUser) => {
  const user = { ...payload, role: 'user' };
  const result = await User.create(user);
  return result;
};

const registerManagerIntoDB = async (payload: IUser) => {
  const user = { ...payload, role: 'manager' };
  const result = await User.create(user);
  return result;
};

// register seller
const registerSellerIntoDB = async (payload: IUser) => {
  const user = { ...payload, role: 'seller' };
  const result = await User.create(user);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  // Check if the user is exist or not
  const user = await User.isUserExistByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // Check if the password is matched or not
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // Access is granted ==> Create access token and Send to the user

  // Create jwt payload
  const jwtPayload = {
    email: user.email,
    role: user?.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUserIntoDB,
  registerManagerIntoDB,
  registerSellerIntoDB,
  loginUser,
  refreshToken,
};

// const loginUser = async (payload: ILoginUser) => {
//   // Check if the user is exist or not
//   const user = await User.isUserExistByEmail(payload?.email);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
//   }

//   // Check if the password is matched or not
//   if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
//   }

//   // Access is granted ==> Create access token and Send to the user

//   // Create jwt payload
//   const jwtPayload = {
//     email: user.email,
//     role: user?.role as string,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   const refreshToken = createToken(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     config.jwt_refresh_expires_in as string,
//   );

//   return {
//     accessToken,
//     refreshToken,
//   };
// };

// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string,
//   ) as JwtPayload;

//   const { email } = decoded;

//   const user = await User.isUserExistByEmail(email);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
//   }

//   const jwtPayload = {
//     email: user.email,
//     role: user.role as string,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   return {
//     accessToken,
//   };
// };

// export const AuthServices = {
//   registerUserIntoDB,
//   loginUser,
//   refreshToken,
// };
