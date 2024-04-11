import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "@/models/models";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };
  return { user, addUser, removeUser };
};
