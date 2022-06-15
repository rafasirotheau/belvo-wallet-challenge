import {
  getExpirationDate,
  isExpired,
  localStorageKey,
  tokenFromLocalStorage,
  generateAuthInfo,
} from "../authorization.helpers";

const loginResponse = {
  access_token:
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWNreSIsImV4cCI6MTY1NTMyNjc0OX0.JIkYKkfyQ0Y18qZarGIxWfUurPuqrJZu_4w7OViqxSAeHFAHA_R7ikjoszzzDcAgyaH32q_mI7MDpf7a3EaMVg",
  token_type: "bearer",
};

describe("getExpirationDate()", () => {
  it("should return a valid expiration value", () => {
    const exp = getExpirationDate(loginResponse.access_token);

    expect(typeof exp).toBe("number");
    expect(exp).toBe(1655326749000);
  });

  it("should return null", () => {
    expect(getExpirationDate()).toBeNull();
    expect(getExpirationDate("")).toBeNull();
    expect(getExpirationDate("some-invalid.string")).toBeNull();
  });
});

describe("isExpired()", () => {
  const expiration = 1655326749000;

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
    window.localStorage.removeItem(localStorageKey);
  });

  it("should set token", () => {
    tokenFromLocalStorage.set(loginResponse);
    expect(spySet).toHaveBeenCalledWith(
      localStorageKey,
      JSON.stringify(loginResponse)
    );
  });

  it("should get token", () => {
    const token = tokenFromLocalStorage.get();
    expect(spyGet).toHaveBeenCalledWith(localStorageKey);
    expect(token).toEqual(loginResponse);
  });
});

describe("generateAuthInfo()", () => {
  it("should generate valid authInfo", () => {
    const authInfo = generateAuthInfo(loginResponse);

    expect(authInfo.accessToken).toEqual(loginResponse.access_token);
    expect(authInfo).toMatchInlineSnapshot(`
      Object {
        "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWNreSIsImV4cCI6MTY1NTMyNjc0OX0.JIkYKkfyQ0Y18qZarGIxWfUurPuqrJZu_4w7OViqxSAeHFAHA_R7ikjoszzzDcAgyaH32q_mI7MDpf7a3EaMVg",
        "expiration": 1655326749000,
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
