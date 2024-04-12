import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { User } from "@/models/models";

export const useAuth = () => {
  const { addUser, removeUser, user,getUser } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { login, logout, user, isAuthenticated,getUser };
};
