import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "@/models/models";

export const useUser = () => {
  const { setItem, removeItem, getItem } = useLocalStorage();
  const [user, setUser] = useState<User | null>(JSON.parse(getItem("user")!));

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
    setItem("isAuthenticated", JSON.stringify(true));
  };

  //TODO: remove getUser & use user
  const getUser = () => JSON.parse(getItem("user")!);

  const removeUser = () => {
    setUser(null);
    removeItem("user");
    removeItem("isAuthenticated");
  };

  return { user, addUser, removeUser, getUser };
};
