import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getWallet } from "../api/belvo-wallet";
import { WalletResponseData } from "../api/belvo-wallet.types";

export interface WalletContextData extends WalletResponseData {
  getWallet?: () => Promise<WalletResponseData>;
}

interface WalletProviderProps {
  children: ReactNode;
}

const WalletContext = createContext({});

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletInformation, setWalletInformation] = useState<
    Partial<WalletResponseData>
  >({});

  const getWalletHandler = () => {
    getWallet().then(setWalletInformation);
  };

  useEffect(() => {
    return () => {
      getWalletHandler();
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{ getWallet: getWalletHandler, ...walletInformation }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export function useWalletContext(): Partial<WalletContextData> {
  return useContext(WalletContext);
}

export default WalletContext;
