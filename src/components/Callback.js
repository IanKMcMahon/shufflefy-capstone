import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeCodeForToken } from "./Auth";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    const handleTokenExchange = async () => {
      try {
        if (code) {
          await exchangeCodeForToken(code);
          navigate("/playlists"); // Redirect upon successful token exchange
        } else {
          throw new Error("No authorization code found");
        }
      } catch (error) {
        console.error("Error exchanging code for token:", error);
        navigate("/error"); // Redirect to error page in case of error
      }
    };

    handleTokenExchange();

    // No cleanup function needed in this case
  }, [location.search, navigate]);

  return <div>Loading...</div>; // Display loading indicator while processing callback
};

export default Callback;
