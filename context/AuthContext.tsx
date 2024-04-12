import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { User } from "@/models/models";
export type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  getUser: () => User | null;
};

export const AuthContext = React.createContext<AuthContextType | null>(null!);

export const AuthProvider = (props: React.PropsWithChildren) => {
  const { login, logout, isAuthenticated, user } = useAuth();
  const { getUser } = useUser();
  const { children } = props;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
