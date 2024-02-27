import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interfaces/error';

const handleDuplicateError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  // Check if a match is found
  const extractedMessage = match && match[1];

  const stringMessage = `${extractedMessage} is already exist in database.`;

  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Entry',
    errorMessage: stringMessage,
  };
};

export default handleDuplicateError;
