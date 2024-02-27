import { NextFunction, Response, Request } from 'express';
// import catchAsync from '../utils/catchAsync';
// import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../config';
// import { TUserRole } from '../modules/auth/auth.interface';
// import { User } from '../modules/auth/auth.model';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { TUserRole } from './auth.interface';
import { User } from './auth.model';
import config from '../../config';

interface CustomRequest extends Request {
  user: JwtPayload;
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // Check if the token is send from the client
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorozed vai',
        );
      }

      // Check if the token is valid. If not valid error handeling
      let decoded;
      try {
        decoded = jwt.verify(
          token,
          config.jwt_access_secret as string,
        ) as JwtPayload;
      } catch (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
      }

      const { role, email } = decoded;

      // Checking if the user is exist
      const user = await User.isUserExistByEmail(email);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
      }

      // authorization
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized vau',
        );
      }

      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default auth;
