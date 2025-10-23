import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_USER } from '../utils/constants';
import { login as loginApi, register as registerApi } from '../services/authService';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Check if user is authenticated (has an id from backend)
      setIsAuthenticated(!!parsedUser.id);
    } else {
      // Set default guest user
      const defaultUser = {
        ...DEFAULT_USER,
        createdAt: new Date().toISOString(),
      };
      setUser(defaultUser);
      setIsAuthenticated(false);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
    }
  }, []);

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  };

  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      const authenticatedUser = response.user;
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authenticatedUser));
      return { success: true, user: authenticatedUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerApi(userData);
      const newUser = response.user;
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    // Reset to default guest user
    const defaultUser = {
      ...DEFAULT_USER,
      createdAt: new Date().toISOString(),
    };
    setUser(defaultUser);
    setIsAuthenticated(false);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
  };

  const value = {
    user,
    isAuthenticated,
    updateUser,
    login,
    register,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
