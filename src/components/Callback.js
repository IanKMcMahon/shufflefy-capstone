import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.js";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");

      if (code) {
        try {
          console.log(code);
          const response = await axios.post(
            "http://localhost:5000/exchange-token",
            { code: code }
          );

          // Check if response status is OK
          if (response.status === 200) {
            // Set the access token in state
            console.log("SUCCESS");
            console.log(response.data.access_token);
            setAccessToken(response.data.access_token);
          } else {
            // Handle unexpected response status
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          console.error("Error exchanging code for token:", error);
          // Handle error if needed
        }
      }
    };

    fetchData();
  }, [location.search, setAccessToken]);

  // Log the accessToken whenever it changes and navigate to Playlists page
  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      // Navigate to another page after the accessToken is set
      navigate("/playlists");
    }
  }, [accessToken, navigate]);
};

export default Callback;
