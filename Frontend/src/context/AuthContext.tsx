import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'worker' | 'employer';

type AuthContextType = {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const { isAuthenticated: storedIsAuth, userRole: storedRole } = JSON.parse(storedAuth);
        setIsAuthenticated(storedIsAuth);
        setUserRole(storedRole);
      } catch (e) {
        console.error('Failed to parse auth from localStorage', e);
      }
    }
  }, []);

  const login = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, userRole: role }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
