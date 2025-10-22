import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_USER } from '../utils/constants';

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

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Set default user
      const defaultUser = {
        ...DEFAULT_USER,
        createdAt: new Date().toISOString(),
      };
      setUser(defaultUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
    }
  }, []);

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  };

  const value = {
    user,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
