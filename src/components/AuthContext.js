import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const setAuthData = (userId, username) => {
    setUserId(userId);
    setUsername(username);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
  };

  const clearAuthData = () => {
    setUserId("");
    setUsername("");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
        setAuthData,
        clearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
