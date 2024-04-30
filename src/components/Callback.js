import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeCodeForToken } from "./Auth";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");

    // Verify state parameter to prevent CSRF attacks

    // Exchange authorization code for access token
    exchangeCodeForToken(code)
      .then((response) => {
        // Handle successful token exchange (store tokens, redirect, etc.)
        console.log("Access token:", response.access_token);
        console.log("Refresh token:", response.refresh_token);
        navigate("/profile"); // Redirect to profile page or any other route
      })
      .catch((error) => {
        // Handle token exchange error
        console.error("Error exchanging code for token:", error);
        navigate("/error"); // Redirect to error page
      });
  }, [location.search, navigate]);

  return <div>Loading...</div>; // Display loading indicator while processing callback
};

export default Callback;
