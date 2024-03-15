import { ReactNode, createContext, useContext, useState } from "react";

interface TokenContextType {
  token: string | undefined;
  setToken: (token: TokenContextType["token"]) => void;
  refreshToken: string | undefined;
  setRefreshToken: (refreshToken: TokenContextType["refreshToken"]) => void;
}

interface TokenContextProviderType {
  children: ReactNode;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenContextProvider = ({
  children,
}: TokenContextProviderType) => {
  const [token, setToken] = useState<TokenContextType["token"]>(undefined);
  const [refreshToken, setRefreshToken] =
    useState<TokenContextType["refreshToken"]>(undefined);

  return (
    <TokenContext.Provider
      value={{ token, setToken, refreshToken, setRefreshToken }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};
