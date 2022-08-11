import fs_async from 'fs/promises';
import fs from 'fs';


import { IDeposit } from '../utils/interfaces/appInterface';

const transactionDB = 'transaction.json';

export const createTransactionHandler = async (data: any) => {
  const stringifyData = JSON.stringify(data, null, 2);
  await fs_async.writeFile('transaction.json', stringifyData);
};

export const getTransactionByIDHandler = async (id: String) => {
  let transaction_db_exist: boolean = fs.existsSync(transactionDB);

  if (!transaction_db_exist) return {};

  const transactions: any = await fs_async.readFile(transactionDB);

  let transaction = JSON.parse(transactions).find(
    (item: IDeposit) => item.id == id
  );

  return transaction;
};

export const getTransactionsHandler = async () => {
  let transactions_db_exist: boolean = fs.existsSync(transactionDB);
  if (!transactions_db_exist) return [];

  const data: any = await fs_async.readFile(transactionDB);

  return JSON.parse(data);
};
