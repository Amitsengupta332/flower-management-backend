import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorMessages: string[] = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      const errorMessage = value.message;
      return errorMessage;
    },
  );

  const concatenatedErrorMessages = errorMessages.join(' ');

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: concatenatedErrorMessages,
  };
};

export default handleValidationError;
