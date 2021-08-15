import { Response } from 'express';

interface HttpError extends Error {
  statusCode: number;
}
class CustomError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err: HttpError, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export { CustomError, handleError };
