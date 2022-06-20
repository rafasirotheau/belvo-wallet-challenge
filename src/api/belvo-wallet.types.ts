import {
  CURRENCIES,
  TRANSACTION_ROLES,
  TRANSACTION_STATUS,
} from "./belvo-wallet.consts";

export type Currency = typeof CURRENCIES[number];
type TransactionStatus = typeof TRANSACTION_STATUS[number];
export type Balance = Record<Currency, number>;

export type TransactionRole = typeof TRANSACTION_ROLES[number] | null;

export interface ContactsProps {
  email: string;
  name: string;
}

export interface TransactionProps {
  description: string;
  amount: number;
  currency: Currency;
  sender: string;
  receiver: string;
  status: TransactionStatus;
}

export type ContactsResponseType = {
  data: ContactsProps[];
};

export interface WalletResponseData {
  email: string;
  transactions: TransactionProps[];
  balance: Balance;
}

export type BaseTransactionPayload = Pick<
  TransactionProps,
  "description" | "amount" | "currency"
>;
export type SendTransactionPayload = BaseTransactionPayload &
  Pick<TransactionProps, "receiver">;
export type RequestTransactionPayload = BaseTransactionPayload &
  Pick<TransactionProps, "sender">;

export type LoginPayloadType = {
  password: string;
  username: string;
};

export type LoginResponseType = {
  data: {
    access_token: string;
    token_type: string;
  };
};

export type ValidationErrorType = {
  detail: [
    {
      loc: string[];
      msg: string;
      type: string;
    }
  ];
};
