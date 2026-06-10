import { useState, useCallback } from 'react';
import { User, AuthState } from '@/types';
import { getUsers, saveUsers, getCurrentUser, saveCurrentUser, generateId } from '@/lib/storage';

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => ({
    user: getCurrentUser(),
    isAuthenticated: !!getCurrentUser(),
  }));

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password' };
    saveCurrentUser(user);
    setAuth({ user, isAuthenticated: true });
    return { success: true };
  }, []);

  const register = useCallback((
    name: string,
    email: string,
    password: string,
    role: 'seller' | 'bidder' | 'both'
  ): { success: boolean; error?: string } => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    saveCurrentUser(newUser);
    setAuth({ user: newUser, isAuthenticated: true });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    saveCurrentUser(null);
    setAuth({ user: null, isAuthenticated: false });
  }, []);

  return { auth, login, register, logout };
}
