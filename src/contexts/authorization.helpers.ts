import { LoginResponseType } from "../api/belvo-wallet.types";

export interface AuthInfoType {
  accessToken: LoginResponseType["data"]["access_token"];
  isLoggedIn: boolean;
  expiration: number | null;
}

export const getExpirationDate = (
  accessToken?: AuthInfoType["accessToken"]
): AuthInfoType["expiration"] => {
  if (!accessToken) {
    return null;
  }

  let jwt;
  try {
    jwt = JSON.parse(atob(accessToken.split(".")[1]));
  } catch (e) {
    // do nothing
  }

  return jwt?.exp * 1000 || null;
};

export const isExpired = (exp?: AuthInfoType["expiration"]) =>
  typeof exp === "number" ? Date.now() > exp : false;

export const localStorageKey = "JWT_AUTH_TOKEN";

export const tokenFromLocalStorage = {
  get: (): LoginResponseType["data"] =>
    JSON.parse(localStorage.getItem(localStorageKey) || "null"),
  set: (data: LoginResponseType["data"]) =>
    localStorage.setItem(localStorageKey, JSON.stringify(data)),
};

export const generateAuthInfo = (
  data?: LoginResponseType["data"] | null
): AuthInfoType => {
  const accessToken = data?.access_token || "";
  const expiration = getExpirationDate(accessToken);

  return {
    accessToken,
    expiration,
    isLoggedIn: !!accessToken && isExpired(expiration),
  };
};
