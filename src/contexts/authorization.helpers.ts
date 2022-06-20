import { LoginResponseType } from "../api/belvo-wallet.types";

export interface JwtPayloadType {
  exp: number | null;
  sub: string;
}

export interface AuthInfoType {
  accessToken: LoginResponseType["data"]["access_token"];
  isLoggedIn: boolean;
  expiration: JwtPayloadType["exp"];
  username: JwtPayloadType["sub"];
}

export const getJwtPayload = (
  accessToken?: AuthInfoType["accessToken"]
): JwtPayloadType => {
  if (!accessToken) {
    return { exp: null, sub: "" };
  }

  let jwt;
  try {
    jwt = JSON.parse(atob(accessToken.split(".")[1]));
  } catch (e) {
    // do nothing
  }

  return {
    exp: jwt?.exp * 1000 || null,
    sub: jwt?.sub || "",
  };
};

export const isExpired = (exp?: AuthInfoType["expiration"]) =>
  typeof exp === "number" ? Date.now() > exp : true;

export const LOCALSTORAGE_KEY = "JWT_AUTH_TOKEN";

export const tokenFromLocalStorage = {
  get: (): LoginResponseType["data"] =>
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "null"),
  set: (data: LoginResponseType["data"]) =>
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data)),
  remove: () => localStorage.removeItem(LOCALSTORAGE_KEY),
};

export const generateAuthInfo = (
  data?: LoginResponseType["data"] | null
): AuthInfoType => {
  const accessToken = data?.access_token || "";
  const { exp: expiration, sub: username } = getJwtPayload(accessToken);

  return {
    accessToken,
    expiration,
    username,
    isLoggedIn: !!accessToken && !isExpired(expiration),
  };
};
