import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
  token: string | undefined;
  setToken: (token: UserContextType["token"]) => void;
}

interface UserContextProviderType {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [token, setToken] = useState<UserContextType["token"]>(undefined);
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
