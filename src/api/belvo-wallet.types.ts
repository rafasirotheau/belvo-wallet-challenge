interface ContactsProps {
  email: string;
  name: string;
}

export interface TransactionProps {
  description: string;
  amount: number;
  currency: "ETH" | "BTC" | "DOGE";
  sender: string;
  receiver: string;
  status: "Pending" | "Done" | "Reject";
}

export type ContactsResponseType = {
  data: ContactsProps[];
};

export type WalletResponseType = {
  data: {
    email: string;
    transactions: TransactionProps[];
    balance: Record<TransactionProps["currency"], number>;
  };
};

export type SendPayloadType = Omit<TransactionProps, "sender" | "status">;

export type RequestPayloadType = Omit<TransactionProps, "receiver" | "status">;

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


