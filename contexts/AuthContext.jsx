import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const saveToken = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
  };

  const clearToken = () => {
    setToken(null);
    setUser(null);
  };

  const context = {
    token,
    user,
    saveToken,
    clearToken,
    setUser,
    setToken,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
