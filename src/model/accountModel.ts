import fs_async from 'fs/promises';
import fs from 'fs';
import { IAccount } from '../utils/interfaces/appInterface';

const accountDB = 'account.json';


export const uniqueAccountNumber = () =>(
  Math.floor(Math.random() * 10000000000) + 10000000000
)
  .toString()
  .substring(1);

export const createAccountHandler = async (data: any) => {
  const stringifyData = JSON.stringify(data, null, 2);


  await fs.writeFileSync(accountDB, stringifyData, {
    flag: 'w',
  });
};

export const getAccountByIDHandler = async (id:String) => {
  let account_db_exist: boolean = fs.existsSync(accountDB);
  if (!account_db_exist) return {};
 
  const accounts: any = await fs_async.readFile(accountDB);

  let account = JSON.parse(accounts).find((item: IAccount) => item.id == id);

  return account;
};

export const getAccountsHandler = async () => {
  let account_db_exist: boolean = fs.existsSync(accountDB);
  if (!account_db_exist) return [];

  const jsonData: any = await fs_async.readFile(accountDB);

  return JSON.parse(jsonData);
};

export const getAccountByAccountHandler = async (account_number: String) => {
  let account_db_exist: boolean = fs.existsSync(accountDB);
  if (!account_db_exist) return {};

  const accounts: any = await fs_async.readFile(accountDB);

  let account = JSON.parse(accounts).find(
    (item: IAccount) => item.account_number == account_number
  );

  return account;
};