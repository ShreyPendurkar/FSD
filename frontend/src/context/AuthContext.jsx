import React, { createContext, useState, useEffect } from 'react';

// Create Auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On app load, check if token exists
 useEffect(() => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const { user } = JSON.parse(atob(token.split('.')[1]));
      setUser(user);
    } catch {
      localStorage.removeItem('accessToken');
    }
  }
}, []);

const login = (token) => {
  localStorage.setItem('accessToken', token);
  try {
    const { user } = JSON.parse(atob(token.split('.')[1]));
    setUser(user);
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('accessToken');
    setUser(null);
  }
};

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
