import { Request, Response, NextFunction } from 'express';
import {
  getTransactionsHandler,
  createTransactionHandler,
  getTransactionByIDHandler,
} from '../model/transactionModel';
import { v4 as uuidv4 } from 'uuid';
import {
  getAccountsHandler,
  createAccountHandler,
  getAccountByIDHandler,
  getAccountByAccountHandler,
} from '../model/accountModel';
import HttpError from '../utils/errorHandler/http-error';
import { IAccount, IDeposit } from '../utils/interfaces/appInterface';

let date = new Date();

const deposit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await getAccountsHandler();
    const transactions = await getTransactionsHandler();

    const { amount, account_number } = req.body;

    const userAccount = accounts.find(
      (account) => account.account_number == account_number
    );

    if (!userAccount) {
      return next(new HttpError(`The Account Number does not exist`, 404));
    }

    let newBalance = userAccount.balance + amount;

    const updated_accounts = accounts.map((account: IAccount) => {
      if (account.account_number === account_number) {
        account = {
          ...account,
          balance: newBalance,
          updatedAt: Math.floor(date.getTime() / 1000).toFixed(0),
        };
      }

      return account;
    });

    const transaction_details = {
      id: uuidv4(),
      transaction_type: 'credit',
      account_name: userAccount.account_name,
      account_number: userAccount.account_number,
      amount: amount,
      createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
      updatedAt: Math.floor(date.getTime() / 1000).toFixed(0),
    };

    transactions.push(transaction_details);

    await createAccountHandler(updated_accounts);
    await createTransactionHandler(transactions);

    const currentTransaction: IDeposit = await getTransactionByIDHandler(
      transaction_details.id
    );

    res.status(200).json({
      status: 'success',
      data: {
        account_number: account_number,
        total_balance: newBalance,
        credit_amount: amount,
        transaction: currentTransaction,
      },
    });
  } catch (error) {
    return next(new HttpError(`An Error Occured`, 500));
  }
};

const withdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await getAccountsHandler();
    const transactions = await getTransactionsHandler();

    const { amount, account_number } = req.body;

    let user_account = await getAccountByAccountHandler(account_number);

    if (!user_account) {
      return next(new HttpError('The Account Number does not exist', 404));
    }

    if (user_account.balance < amount) {
      return next(
        new HttpError(
          'The amount you are trying to withdraw exceeds your current balance',
          409
        )
      );
    }

    const transaction_details = {
      id: uuidv4(),
      transaction_type: 'debit',
      account_name: user_account.account_name,
      account_number: user_account.account_number,
      amount: amount,
      createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
      updatedAt: Math.floor(date.getTime() / 1000).toFixed(0),
    };

    let new_balance = user_account.balance - amount;

    const new_accounts = accounts.map((account: IAccount) => {
      if (account.account_number === account_number) {
        account = {
          ...account,
          updatedAt: Math.floor(date.getTime() / 1000).toFixed(0),
          balance: new_balance,
        };
      }
      return account;
    });

    transactions.push(transaction_details);
    await createAccountHandler(new_accounts);

    await createTransactionHandler(transactions);

    const currentTransaction = await getTransactionByIDHandler(
      transaction_details.id
    );

    res.status(200).json({
      success: 'success',
      data: {
        total_balance: new_balance,
        amount: amount,
        transaction: currentTransaction,
      },
    });
  } catch (error) {
    return next(new HttpError(`An Error Occured`, 500));
  }
};

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const { account_number, transaction_type } = req.query;

    console.log(account_number, transaction_type);

    let transactions = await getTransactionsHandler();
    
    if (account_number) {
      transactions = transactions.filter(
        (transaction: IDeposit) => transaction.account_number === account_number
      );
    }

    if (transaction_type) {
      transactions = transactions.filter(
        (transaction: IDeposit) =>
          transaction.transaction_type === transaction_type
      );
    }

    const sortedtransactions = transactions.sort(
      (transactionA: any, transactionB: any) =>
        Number(transactionB.createdAt) - Number(transactionA.createdAt)
    );

    return res.status(200).json({
      status: 'success',
      data: sortedtransactions,
    });
  } catch (error) {
    console.log('getTransactions ==== ', error);
    return next(new HttpError(`An Error Occured`, 500));
  }
};

export default {
  deposit,
  withdrawal,
  getTransactions,
};
