import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Button onClick={handleLogin}>Login with Spotify</Button>
    </div>
  );
};

export default Login;
