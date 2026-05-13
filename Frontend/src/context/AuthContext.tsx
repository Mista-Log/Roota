import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type UserRole = "WORKER" | "EMPLOYER" | "ADMIN";

type User = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
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

  login: (email: string, password: string) => Promise<User>;

  signup: (data: SignupData) => Promise<User>;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:8000/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // ==========================================
  // FETCH AUTHENTICATED USER
  // ==========================================
  const fetchAuthenticatedUser = async (): Promise<User> => {
    const token = localStorage.getItem("access");

    const response = await fetch(`${API_URL}/auth/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
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
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }

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
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    console.log(data)


    if (!response.ok) {
      throw new Error(data.detail || "Signup failed");
    }

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