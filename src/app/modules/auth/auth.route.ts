import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from './auth';
import { USER_ROLE } from './auth.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registrationValidationSchema),
  AuthControllers.registerUser,
);

router.post(
  '/create-manager',
  validateRequest(AuthValidation.registrationValidationSchema),
  AuthControllers.createManager,
);

router.post(
  '/create-seller',
  auth(USER_ROLE.manager),
  validateRequest(AuthValidation.registrationValidationSchema),
  AuthControllers.createSeller,
);

// Route will call controller function
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
