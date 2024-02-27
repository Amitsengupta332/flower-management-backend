import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interfaces/error';

const handelZodError = (err: ZodError): TGenericErrorResponse => {
  const errorMessage: string[] = err.issues.map((issue: ZodIssue) => {
    const fieldName = issue?.path[issue.path.length - 1];
    const errorMessage = issue.message;

    return `${fieldName} is ${errorMessage}`;
  });

  const statusCode = 400;
  const concatenatedErrorMessages = errorMessage.join('. ');
  return {
    statusCode,
    message: 'Zod Error',
    errorMessage: concatenatedErrorMessages,
  };
};

export default handelZodError;
