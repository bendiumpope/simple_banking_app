import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/errorHandler/http-error';

export const transactionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { account_number, amount } = req.body;

  if (!account_number || !amount) {
    return next(
      new HttpError(
        `Please provide an ${!account_number ? 'account number' : 'amount'}`,
        400
      )
    );
  }

  if (typeof account_number != 'string') {
    return next(
      new HttpError(
        'account number must be a string',
        400
      )
    );
  }

  if (account_number.length != 10) {
    return next(new HttpError('account number must 10 digits', 400));
  }

  if (typeof amount != 'number') {
    return next(new HttpError('amount must be a number', 400));
  }

  next();
};

