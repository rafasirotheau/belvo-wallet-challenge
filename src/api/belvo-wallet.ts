import BelvoWalletApi from "./belvo-wallet.config";
import {
  BaseTransactionPayload,
  ContactsResponseType,
  LoginPayloadType,
  LoginResponseType,
  TransactionProps,
  TransactionRole,
  WalletResponseData,
} from "./belvo-wallet.types";

export function getContacts() {
  return BelvoWalletApi.get("/contacts").then(
    (response: ContactsResponseType) => {
      return response.data;
    }
  );
}

export function getWallet() {
  return BelvoWalletApi.get("/wallet").then((response): WalletResponseData => {
    return response.data;
  });
}

export function doWalletTransaction(
  payload: BaseTransactionPayload,
  userRole: NonNullable<TransactionRole>,
  contact: string
) {
  const endpoint = `/wallet/${userRole === "sender" ? "send" : "request"}`;

  return BelvoWalletApi.post(endpoint, {
    ...payload,
    [userRole === "sender" ? "receiver" : "sender"]: contact,
  }).then(({ data }: { data: TransactionProps }) => {
    return data;
  });
}

export function doLogin(payload: LoginPayloadType) {
  return BelvoWalletApi.post("/login", payload).then(
    ({ data }: LoginResponseType) => {
      return data;
    }
  );
}
