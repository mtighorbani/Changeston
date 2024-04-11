import { User } from "@/models/models";
import { createContext } from "react";

interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
  }
  
  export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => {},
  });