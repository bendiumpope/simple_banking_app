import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/errorHandler/http-error';
import { v4 as uuidv4 } from 'uuid';
import { IAccount } from '../utils/interfaces/appInterface';
import {
  getAccountsHandler,
  createAccountHandler,
  getAccountByIDHandler,
  uniqueAccountNumber,
} from '../model/accountModel';

let date = new Date();

const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accounts = await getAccountsHandler();

    const accountDetails: IAccount = {
      id: uuidv4(),
      account_name: req.body.account_name,
      account_number: uniqueAccountNumber(),
      phone: req.body.phone,
      balance: 0,
      createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
      updatedAt: Math.floor(date.getTime() / 1000).toFixed(0),
    };

    accounts.push(accountDetails);

    await createAccountHandler(accounts);

    let account: IAccount = await getAccountByIDHandler(accountDetails.id);

    res.status(201).json({
      status: 'success',
      data: {
        id: account.id,
        account_name: req.body.account_name,
        account_number: account.account_number,
        phone: account.phone,
        balance: 0,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      },
    });
  } catch (error) {
    
    return next(new HttpError('An error occured', 500));
  }
};

const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let accounts: [] = await getAccountsHandler();

    res.status(200).json({
      status: 'success',
      data: accounts,
    });
  } catch (error) {
    return next(new HttpError('An error occured', 500));
  }
};

export default {
  createAccount,
  getAccounts,
};
