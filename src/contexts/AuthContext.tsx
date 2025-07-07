import { createContext, useContext, useEffect, useState } from "react";
import type { AuthUser, LoginRequest, RegisterRequest } from "../types";
import { authService } from "../services";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (crendentials: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name: string; YOB: number }) => Promise<boolean>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Token Check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService
        .getProfile()
        .then((response) => setUser(response.data.user))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await authService.signin(credentials);
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const register = async (data: RegisterRequest) => {
    await authService.signup(data);
    await login({ membername: data.membername, password: data.password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    authService.logout();
  };

  const updateProfile = async (data: {
    name: string;
    YOB: number;
  }): Promise<boolean> => {
    try {
      if (!user) return false;
      const response = await authService.updateProfile(user._id, data);
      if (response.success) {
        setUser((prev) => (prev ? { ...prev, ...data } : null));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Profile update failed:", error);
      return false;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    try {
      if (!user) return false;
      const response = await authService.changePassword(user._id, {
        currentPassword,
        newPassword,
      });
      return response.success;
    } catch (error) {
      console.error("Password change failed:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
      }}
    >
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
