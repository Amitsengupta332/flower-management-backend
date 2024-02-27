/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handelZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateError';
import jwtError from '../errors/jwtError';
import AppError from '../errors/AppError';
import customError from '../errors/customError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // settign default values
  let statusCode = 500;
  let message = 'Something went Wrong!!!';
  let errorMessage: string = '';
  let data = null;

  // validation dynamic message
  if (err instanceof ZodError) {
    const simplifiedError = handelZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err instanceof jwtError) {
    statusCode = err.statusCode;
    message = 'Unauthorized Access';
    errorMessage = err.message;
  } else if (err instanceof customError) {
    statusCode = err.statusCode;
    message = err.message;
    // errorMessage = err.message
    data = err.data;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = 'App Error';
    errorMessage = err.message;
  } else if (err instanceof Error) {
    message = 'Something Wrong!!';
    errorMessage = err.message;
  }

  // ultimate error return
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    data,
    errorDetails: err instanceof jwtError ? null : err,
    stack:
      config.node_env === 'production'
        ? err instanceof jwtError
          ? null
          : err?.stack
        : null,
  });
};

export default globalErrorHandler;
