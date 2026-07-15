import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('invoiceflow_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('invoiceflow_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleLogout = () => signOut();
    window.addEventListener('invoiceflow:logout', handleLogout);
    return () => window.removeEventListener('invoiceflow:logout', handleLogout);
  }, []);

  const persistSession = (session) => {
    localStorage.setItem('invoiceflow_token', session.token);
    localStorage.setItem('invoiceflow_user', JSON.stringify(session));
    setToken(session.token);
    setUser(session);
  };

  const signIn = async (credentials) => {
    const session = await authService.login(credentials);
    persistSession(session);
    return session;
  };

  const signUp = async (payload) => {
    const session = await authService.register(payload);
    persistSession(session);
    return session;
  };

  const signOut = () => {
    localStorage.removeItem('invoiceflow_token');
    localStorage.removeItem('invoiceflow_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      role: user?.role,
      isAuthenticated: Boolean(token),
      signIn,
      signUp,
      signOut,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
