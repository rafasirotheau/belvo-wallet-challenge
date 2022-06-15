import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthInfoType,
  generateAuthInfo,
  tokenFromLocalStorage,
} from "./authorization.helpers";
import { doLogin } from "../api/belvo-wallet";
import { setToken } from "../api/belvo-wallet.config";
import { LoginPayloadType, LoginResponseType } from "../api/belvo-wallet.types";

interface AuthContextData {
  authInfo?: AuthInfoType;
  loginHandler?: (args: LoginPayloadType) => Promise<LoginResponseType["data"]>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authInfo, setAuthInfo] = useState<AuthContextData["authInfo"]>(
    generateAuthInfo(tokenFromLocalStorage.get())
  );

  const loginHandler: AuthContextData["loginHandler"] = (args) => {
    return doLogin(args).then((data: LoginResponseType["data"]) => {
      setAuthInfo(generateAuthInfo(data));
      tokenFromLocalStorage.set(data);
      return data;
    });
  };

  useEffect(() => {
    if (authInfo?.accessToken) {
      setToken(authInfo.accessToken);
    }
  }, [authInfo?.accessToken]);

  return (
    <AuthContext.Provider value={{ authInfo, loginHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContextData {
  return useContext(AuthContext);
}
