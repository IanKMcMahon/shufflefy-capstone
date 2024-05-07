import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);

  const exchangeToken = async (code) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/exchange-token",
        {
          code: code,
        }
      );
      console.log(response);
      // Set the access token in state
      setAccessToken(response.data.access_token);
      // Navigate to another page if needed
      navigate("/playlists");
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      // Handle error
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    console.log(code);

    // Call the exchangeToken function with the authorization code
    if (code) {
      exchangeToken(code);
    }
  }, [location.search]);

  return <div>Loading...</div>; // Display loading indicator while processing callback
};

export default Callback;
