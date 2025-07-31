import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data - in real app, this would come from your backend
  const mockUser = {
    id: 1,
    username: 'SportsFan2024',
    email: 'fan@sportstalk.com',
    debatePoints: 1250,
    subscriptionStatus: 'free',
    favoriteTeams: ['Lakers', 'Patriots', 'Yankees'],
    joinDate: '2024-01-15'
  };

  useEffect(() => {
    // Check if user is logged in (in real app, check JWT token or session)
    const savedUser = localStorage.getItem('sportstalk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, make API call to authenticate
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('sportstalk_user', JSON.stringify(mockUser));
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sportstalk_user');
  };

  const updateDebatePoints = (points) => {
    if (user) {
      const updatedUser = { ...user, debatePoints: user.debatePoints + points };
      setUser(updatedUser);
      localStorage.setItem('sportstalk_user', JSON.stringify(updatedUser));
    }
  };

  const spendDebatePoints = (points) => {
    if (user && user.debatePoints >= points) {
      const updatedUser = { ...user, debatePoints: user.debatePoints - points };
      setUser(updatedUser);
      localStorage.setItem('sportstalk_user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateDebatePoints,
        spendDebatePoints,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};