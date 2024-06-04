/**
 * AuthContext
 * 
 * This context provides authentication-related data, including access token, username,
 * and tracks, to all components within the application.
 */

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

/**
 * AuthProvider Component
 * 
 * This component acts as a provider for the AuthContext. It maintains the state for
 * access token, username, and tracks, and provides methods to update these states.
 * It wraps its children with AuthContext.Provider to make these states and methods
 * available to all child components.
 */
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState("User");
  const [tracks, setTracks] = useState([]);

  /**
   * Updates the access token state.
   * 
   */
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
        tracks,
        setTracks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
