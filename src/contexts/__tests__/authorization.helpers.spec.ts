import {
  getExpirationDate,
  isExpired,
  LOCALSTORAGE_KEY,
  tokenFromLocalStorage,
  generateAuthInfo,
} from "../authorization.helpers";
import { mockedTokenData, mockedLoginResponse } from "./__mocks__";

describe("getExpirationDate()", () => {
  it("should return a valid expiration value", () => {
    const exp = getExpirationDate(mockedLoginResponse.access_token);

    expect(typeof exp).toBe("number");
    expect(exp).toBe(1655565542000);
  });

  it("should return null", () => {
    expect(getExpirationDate()).toBeNull();
    expect(getExpirationDate("")).toBeNull();
    expect(getExpirationDate("some-invalid.string")).toBeNull();
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
  });

  it("should return false", () => {
    jest.setSystemTime(new Date(expiration - 1000));
    expect(isExpired(expiration)).toBeFalsy();
    expect(isExpired()).toBeFalsy();
    expect(isExpired(null)).toBeFalsy();
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
        "isLoggedIn": true,
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
      }
    `);
  });
});
