import { z } from 'zod';

const registrationValidationSchema = z.object({
  body: z.object({
    // fullName: z.string({ required_error: 'user name is required' }),
    email: z.string({ required_error: 'email is required' }).email(),
    role: z.string().optional(),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6, {
        message: 'Password must be at least 6 characters long, Ex: Pass1#',
      })
      .max(20, {
        message: 'Password cannot be more than 20 characters long, Ex: Pass1#',
      }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  registrationValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
};
