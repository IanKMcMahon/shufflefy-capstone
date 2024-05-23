import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Named export
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState("User");

  const updateAccessToken = (token) => {
    console.log("Setting access token:", token);
    setAccessToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken: updateAccessToken,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
