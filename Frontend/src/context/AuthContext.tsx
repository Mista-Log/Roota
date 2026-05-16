import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { apiGet, apiPost } from '../utils/api';

type UserRole = "WORKER" | "EMPLOYER" | "ADMIN";

type User = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar?: string;
  profile_image?: string;
  profile_picture?: string;
  image_url?: string;
};

type SignupData = {
  full_name: string;
  email: string;
  password: string;
  role: "WORKER" | "EMPLOYER";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  userRole: 'worker' | 'employer' | 'admin' | null;

  login: (email: string, password: string) => Promise<User>;

  signup: (data: SignupData) => Promise<User>;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;
  const userRole = user ? (user.role.toLowerCase() as 'worker' | 'employer' | 'admin') : null;

  // ==========================================
  // FETCH AUTHENTICATED USER
  // ==========================================
  const fetchAuthenticatedUser = async (): Promise<User> => {
    return apiGet('/api/auth/me/', false);
  };

  // ==========================================
  // LOAD USER ON REFRESH
  // ==========================================
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchAuthenticatedUser();

        setUser(userData);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ==========================================
  // LOGIN
  // ==========================================
  const login = async (
    email: string,
    password: string
  ): Promise<User> => {
    const data = await apiPost('/api/auth/login/', { email, password }, true);

    localStorage.setItem("access", data.access);

    localStorage.setItem("refresh", data.refresh);

    const userData = await fetchAuthenticatedUser();

    setUser(userData);

    return userData;
  };

  // ==========================================
  // SIGNUP
  // ==========================================
  const signup = async (signupData: SignupData): Promise<User> => {
    await apiPost('/api/auth/register/', signupData, true);

    // Auto login after signup
    return await login(signupData.email, signupData.password);
  };

  // ==========================================
  // LOGOUT
  // ==========================================
  const logout = () => {
    localStorage.removeItem("access");

    localStorage.removeItem("refresh");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        userRole,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}