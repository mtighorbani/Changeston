import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { User } from "@/models/models";

export const useAuth = () => {
  const { addUser, removeUser, user } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof window !== 'undefined' && localStorage.getItem("isAuthenticated") ? true : false
  );

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") ? true : false);
  }, [user]);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
    setIsAuthenticated(false)
  };

  return { login, logout, user, isAuthenticated };
};
