import {
  getJwtPayload,
  isExpired,
  LOCALSTORAGE_KEY,
  tokenFromLocalStorage,
  generateAuthInfo,
} from "../authorization.helpers";
import { mockedTokenData, mockedLoginResponse } from "./__mocks__";

describe("getJwtPayload()", () => {
  it("should return a valid expiration value", () => {
    const { exp, sub } = getJwtPayload(mockedLoginResponse.access_token);

    expect(exp).toEqual(1655565542000);
    expect(sub).toBe("vicky");
  });

  it("should return null", () => {
    const noTokenResponse = { exp: null, sub: "" };
    expect(getJwtPayload()).toEqual(noTokenResponse);
    expect(getJwtPayload("")).toEqual(noTokenResponse);
    expect(getJwtPayload("some-invalid.string")).toEqual(noTokenResponse);
  });
});

describe("isExpired()", () => {
  const { expiration } = mockedTokenData;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return true", () => {
    jest.setSystemTime(new Date(expiration + 1000));
    expect(isExpired(expiration)).toBeTruthy();
    expect(isExpired()).toBeTruthy();
    expect(isExpired(null)).toBeTruthy();
  });

  it("should return false", () => {
    jest.setSystemTime(new Date(expiration - 1000));
    expect(isExpired(expiration)).toBeFalsy();
  });
});

describe("tokenFromLocalStorage()", () => {
  const spySet = jest.spyOn(window.localStorage.__proto__, "setItem");
  const spyGet = jest.spyOn(window.localStorage.__proto__, "getItem");

  afterAll(() => {
    window.localStorage.removeItem(LOCALSTORAGE_KEY);
  });

  it("should set token", () => {
    tokenFromLocalStorage.set(mockedLoginResponse);
    expect(spySet).toHaveBeenCalledWith(
      LOCALSTORAGE_KEY,
      JSON.stringify(mockedLoginResponse)
    );
  });

  it("should get token", () => {
    const token = tokenFromLocalStorage.get();
    expect(spyGet).toHaveBeenCalledWith(LOCALSTORAGE_KEY);
    expect(token).toEqual(mockedLoginResponse);
  });
});

describe("generateAuthInfo()", () => {
  it("should generate valid authInfo", () => {
    const authInfo = generateAuthInfo(mockedLoginResponse);

    expect(authInfo.accessToken).toEqual(mockedLoginResponse.access_token);
    expect(authInfo).toMatchInlineSnapshot(`
      Object {
        "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWNreSIsImV4cCI6MTY1NTU2NTU0Mn0.z2fDTdH5yuba6wHFN4jsVS7edCzYi7uzHuvuy1MRY-N_dX3QeAJxHFwn1I0YALfRVTae3iQcbsiX2sRSOtSxfQ",
        "expiration": 1655565542000,
        "isLoggedIn": false,
        "username": "vicky",
      }
    `);
  });

  it("should generate an empty authInfo", () => {
    const authInfo = generateAuthInfo();
    const authInfoNull = generateAuthInfo(null);

    expect(authInfo).toEqual(authInfoNull);
    expect(authInfo).toMatchInlineSnapshot(`
      Object {
        "accessToken": "",
        "expiration": null,
        "isLoggedIn": false,
        "username": "",
      }
    `);
  });
});
