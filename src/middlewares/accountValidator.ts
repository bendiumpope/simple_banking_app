import { Request, Response, NextFunction } from 'express';
import { string } from 'joi';
import HttpError from '../utils/errorHandler/http-error';

export const createAccountValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { account_name, phone } = req.body;

  if (!account_name || !phone) {
    return next(new HttpError(`Please provide an ${!account_name? 'account name' : 'phone number'}`, 400));
  }

  if (typeof(account_name) != 'string'  || typeof(phone) != 'string') {
    return next(
      new HttpError(
        `${!account_name ? 'account name' : 'phone number'} must be a string`,
        400
      )
    );
  }

  next()
};
