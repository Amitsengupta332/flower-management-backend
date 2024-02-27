import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessage: string = err?.value;

  const stringMessage = `${errorMessage} is not a valid ID!`;

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessage: stringMessage,
  };
};

export default handleCastError;
