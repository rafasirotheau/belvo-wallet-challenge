import MockAdapter from "axios-mock-adapter";
import BelvoWalletApi from "../belvo-wallet.config";
import {
  doLogin,
  doWalletTransaction,
  getContacts,
  getWallet,
} from "../belvo-wallet";
import {
  BaseTransactionPayload,
  ContactsResponseType,
  LoginPayloadType,
  LoginResponseType,
  TransactionProps,
  TransactionRole,
  WalletResponseData,
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
  const successData: WalletResponseData = {
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

describe("Belvo Wallet API :: Wallet Transaction", () => {
  const mockedPayload: BaseTransactionPayload = {
    description: "string",
    amount: 10,
    currency: "ETH",
  };

  const contactEmail = "user2@example.com";
  const userEmail = "user@example.com";

  const successData = (
    role: NonNullable<TransactionRole>
  ): TransactionProps => {
    return {
      ...mockedPayload,
      receiver: role === "sender" ? contactEmail : userEmail,
      sender: role === "sender" ? userEmail : contactEmail,
      status: "Pending",
    };
  };

  mock
    .onPost("/wallet/send", { ...mockedPayload, receiver: contactEmail })
    .reply(200, successData);
  mock
    .onPost("/wallet/request", { ...mockedPayload, sender: contactEmail })
    .reply(200, successData);

  it("should successfully send from wallet", async () => {
    const data = await doWalletTransaction(
      mockedPayload,
      "sender",
      contactEmail
    );

    expect(data).toEqual(successData);
  });

  it("should successfully receive to wallet", async () => {
    const data = await doWalletTransaction(
      mockedPayload,
      "receiver",
      contactEmail
    );

    expect(data).toEqual(successData);
  });
});
