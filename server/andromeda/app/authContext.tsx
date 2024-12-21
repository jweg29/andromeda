import { User } from "@prisma/client";
import { createContext, useContext } from "react";

// Define the AuthContext value type
type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};