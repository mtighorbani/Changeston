import { UserDetailResponse } from "@/models/models";
import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
  userDetail: UserDetailResponse | undefined;
  setUserDetail: (userDetail: UserContextType["userDetail"]) => void;
}

interface UserContextProviderType {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [userDetail, setUserDetail] =
    useState<UserContextType["userDetail"]>(undefined);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
