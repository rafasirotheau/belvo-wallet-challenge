import MockAdapter from "axios-mock-adapter";
import BelvoWalletApi from "../belvo-wallet.config";
import {
  doLogin,
  doWalletRequest,
  doWalletSend,
  getContacts,
  getWallet,
} from "../belvo-wallet";
import {
  ContactsResponseType,
  LoginPayloadType,
  LoginResponseType,
  RequestPayloadType,
  SendPayloadType,
  TransactionProps,
  WalletResponseType,
} from "../belvo-wallet.types";

const mock = new MockAdapter(BelvoWalletApi);

describe("Belvo Wallet API :: Login", () => {
  const payload: LoginPayloadType = {
    password: "123foo",
    username: "user",
  };
  const successData: LoginResponseType["data"] = {
    access_token: "some-jwt-string",
    token_type: "bearer",
  };

  mock.onPost("/login", payload).reply(200, successData);

  it("should successfully login", async () => {
    const data = await doLogin(payload);

    expect(data).toEqual(successData);
  });
});

describe("Belvo Wallet API :: Contacts", () => {
  const successData: ContactsResponseType["data"] = [
    {
      email: "user@example.com",
      name: "Example User",
    },
  ];

  mock.onGet("/contacts").reply(200, successData);

  it("should return a valid contact list", async () => {
    const data = await getContacts();

    expect(data).toEqual(successData);
  });
});

describe("Belvo Wallet API :: Wallet", () => {
  const successData: WalletResponseType["data"] = {
    email: "user@example.com",
    transactions: [
      {
        description: "string",
        amount: 10,
        currency: "ETH",
        sender: "user@example.com",
        receiver: "user2@example.com",
        status: "Pending",
      },
    ],
    balance: {
      ETH: 15,
      DOGE: 0,
      BTC: 0.5,
    },
  };

  mock.onGet("/wallet").reply(200, successData);

  it("should return a valid wallet information", async () => {
    const data = await getWallet();

    expect(data).toEqual(successData);
  });
});

describe("Belvo Wallet API :: Wallet Sending", () => {
  const payload: SendPayloadType = {
    description: "string",
    amount: 10,
    currency: "ETH",
    receiver: "user2@example.com",
  };
  const successData: TransactionProps = {
    ...payload,
    sender: "user@example.com",
    status: "Pending",
  };

  mock.onPost("/wallet/send", payload).reply(200, successData);

  it("should successfully send from wallet", async () => {
    const data = await doWalletSend(payload);

    expect(data).toEqual(successData);
  });
});

describe("Belvo Wallet API :: Wallet Requesting", () => {
  const payload: RequestPayloadType = {
    description: "string",
    amount: 10,
    currency: "ETH",
    sender: "user@example.com",
  };
  const successData: TransactionProps = {
    ...payload,
    receiver: "user2@example.com",
    status: "Pending",
  };

  mock.onPost("/wallet/request", payload).reply(200, successData);

  it("should successfully send from wallet", async () => {
    const data = await doWalletRequest(payload);

    expect(data).toEqual(successData);
  });
});
