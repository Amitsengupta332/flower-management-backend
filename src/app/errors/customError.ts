/* eslint-disable @typescript-eslint/no-explicit-any */
class customError extends Error {
  public statusCode: number;
  data: Record<string, unknown>;
  constructor(statusCode: number, message: string, data: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default customError;
