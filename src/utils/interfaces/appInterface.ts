export interface RequestInterface extends Request {
  requestTime?: string;
}

export interface IAccount {
  id: String;
  account_number: String;
  account_name: String;
  phone: String;
  balance: Number;
  createdAt: String;
  updatedAt: String;
}

export interface IDeposit {
    id: String,
    transaction_type: String,
    account_name: String,
    account_number: String,
    amount_deposited: Number,
    createdAt:String,
  updatedAt: String
}
