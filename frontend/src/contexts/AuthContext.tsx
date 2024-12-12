import { createContext, useContext, useState, useEffect } from "react";
import TokenService from "@/api/services/TokenService";
import { LoginDto, LoginResponse } from "@/types/Users";
import { AuthService } from "@/api/services/AuthenticationService";

interface AuthContextType {
  user: LoginResponse | null;
  login: (userData: LoginDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userData: LoginDto) => {
    const loginInfo = await AuthService.loginUser(userData);
    TokenService.setToken(loginInfo.token);
    localStorage.setItem("user", JSON.stringify(loginInfo));
    setUser(loginInfo);
  };

  const logout = () => {
    TokenService.clearToken();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
