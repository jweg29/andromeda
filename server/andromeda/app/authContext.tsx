import { User } from "@prisma/client"; // Import the Prisma User type
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define the AuthContext value type
type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props type
type AuthProviderProps = {
  children: ReactNode;
};

// Mock login function for demonstration
const mockLogin = async (): Promise<User> => {
  // Replace with your actual login logic (e.g., API call)
  return {
    id: 1,
    email: "john@example.com",
    name: "John Doe",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage or API on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async () => {
    const loggedInUser = await mockLogin();
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};