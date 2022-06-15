import BelvoWalletApi from "./belvo-wallet.config";
import {
  ContactsResponseType,
  LoginPayloadType,
  LoginResponseType,
  RequestPayloadType,
  SendPayloadType,
  TransactionProps,
  WalletResponseType,
} from "./belvo-wallet.types";

export function getContacts() {
  return BelvoWalletApi.get("/contacts").then(
    (response: ContactsResponseType) => {
      return response.data;
    }
  );
}

export function getWallet() {
  return BelvoWalletApi.get("/wallet").then((response: WalletResponseType) => {
    return response.data;
  });
}

export function doWalletSend(payload: SendPayloadType) {
  return BelvoWalletApi.post("/wallet/send", payload).then(
    ({ data }: { data: TransactionProps }) => {
      return data;
    }
  );
}

export function doWalletRequest(payload: RequestPayloadType) {
  return BelvoWalletApi.post("/wallet/request", payload).then(
    ({ data }: { data: TransactionProps }) => {
      return data;
    }
  );
}

export function doLogin(payload: LoginPayloadType) {
  return BelvoWalletApi.post("/login", payload).then(
    ({ data }: LoginResponseType) => {
      return data;
    }
  );
}
