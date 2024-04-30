import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Construct the authorization URL with the required parameters
    const authorizationUrl = "https://accounts.spotify.com/authorize";
    const clientId = "YOUR_CLIENT_ID";
    const redirectUri = "YOUR_REDIRECT_URI";
    const responseType = "code";
    const codeChallenge = "YOUR_CODE_CHALLENGE";
    const state = "YOUR_STATE";
    const scope = "user-read-private user-read-email"; // Add required scopes

    const queryParams = new URLSearchParams({
      client_id: clientId,
      response_type: responseType,
      redirect_uri: redirectUri,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      state: state,
      scope: scope,
    });

    // Redirect the user to the Spotify authorization page
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
