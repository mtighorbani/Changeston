import { ReactNode, createContext, useContext, useState } from "react";

interface TokenContextType {
  token: string | undefined;
  setToken: (token: TokenContextType["token"]) => void;
}

interface TokenContextProviderType {
  children: ReactNode;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenContextProvider = ({
  children,
}: TokenContextProviderType) => {
  const [token, setToken] = useState<TokenContextType["token"]>(undefined);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};
