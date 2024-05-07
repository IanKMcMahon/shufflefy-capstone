import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Construct the authorization URL with the required parameters
    const authorizationUrl = "https://accounts.spotify.com/authorize";
    const clientId = "db419786e9514488959cb7765ca0902d";
    const redirectUri = "http://localhost:3000/callback";
    const responseType = "code";
    // const codeChallenge = "";
    // const state = "YOUR_STATE";
    const scope =
      "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public"; // Add required scopes

    const queryParams = new URLSearchParams({
      client_id: clientId,
      response_type: responseType,
      redirect_uri: redirectUri,
      // code_challenge_method: "S256",
      // code_challenge: codeChallenge,
      // state: state,
      scope: scope,
    });
    window.location.href = `${authorizationUrl}?${queryParams}`;
  };

  return (
    <div>
      <h1>Login to Spotify</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
