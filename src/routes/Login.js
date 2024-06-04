/**
 * Login Component
 * 
 * This component provides a login interface for the user to authenticate with Spotify.
 * It constructs the Spotify authorization URL and redirects the user to the Spotify
 * login page. Once the user logs in and authorizes the application, they are redirected
 * back to the specified callback URL with an authorization code.
 */

import React from "react";
import { Button } from "react-bootstrap";
import "./Login.css";

const Login = () => {

  /**
   * Handles the login process by redirecting the user to the Spotify authorization page.
   */
  const handleLogin = () => {
    // Construct the authorization URL with the required parameters
    const authorizationUrl = "https://accounts.spotify.com/authorize";
    const clientId = "db419786e9514488959cb7765ca0902d";
    const redirectUri = "http://localhost:3000/callback";
    const responseType = "code";
    const scope =
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-library-read"; // Add required scopes

    const queryParams = new URLSearchParams({
      client_id: clientId,
      response_type: responseType,
      redirect_uri: redirectUri,
      scope: scope,
    });
    window.location.href = `${authorizationUrl}?${queryParams}`;
  };

  return (
    <div className="login-container">
      <h1>Login to Spotify</h1>
      <p>Once logged in, you can access all of your personal playlists</p>
      <Button onClick={handleLogin}>Login with Spotify</Button>
    </div>
  );
};

export default Login;
