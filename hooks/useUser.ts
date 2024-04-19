import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "@/models/models";

export const useUser = () => {
  const { setItem, removeItem } = useLocalStorage();
  const [user, setUser] = useState<User | null>(null!);

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
    setItem("isAuthenticated", JSON.stringify(true));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
    removeItem("isAuthenticated");
  };

  return { user, addUser, removeUser };
};
