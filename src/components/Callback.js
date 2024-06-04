
/**
 * Callback Component
 * 
 * This component handles the OAuth callback process. It retrieves the authorization
 * code from the URL, exchanges it for an access token, and then navigates to the
 * playlists page once the token is received. It ensures a minimum loading time of
 * 3 seconds to provide a smooth user experience.
 */

import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.js";
import "ldrs/ring";
import { jelly } from "ldrs";
import "./Callback.css"; // Import CSS for styling

jelly.register();

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // State to control loading
  const [minLoadingTime, setMinLoadingTime] = useState(false); // State to ensure minimum loading time

  useEffect(() => {
    /**
     * Fetches the authorization code from the URL, exchanges it for an access token,
     * and sets the access token in the context.
     */
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");

      if (code) {
        try {
          console.log("Authorization code:", code);

          const response = await axios.post(
            "http://localhost:5000/exchange-token",
            { code: code }
          );

          if (response.status === 200) {
            const token = response.data.access_token;
            if (token) {
              console.log("Access token received:", token);
              console.log(response.data);
              setAccessToken(token);
            } else {
              console.error("No access token in response:", response.data);
            }
          } else {
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          console.error("Error exchanging code for token:", error);
        }
      } else {
        console.error("No authorization code found in URL");
      }
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, [location.search, setAccessToken]);

  useEffect(() => {
    /**
     * Sets a timer to ensure the loading spinner is displayed for at least 3 seconds.
     * This provides a smooth user experience.
     */
    const timer = setTimeout(() => {
      setMinLoadingTime(true);
    }, 3000);

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, []);

  useEffect(() => {
    /**
     * Navigates to the playlists page once the access token is set and the minimum
     * loading time has passed.
     */
    if (accessToken && minLoadingTime) {
      console.log("Navigating to playlists with access token:", accessToken);
      navigate("/playlists");
    }
  }, [accessToken, minLoadingTime, navigate]);

  return (
    <div className="loading-container">
      <l-jelly size="40" speed="0.9" color="#54D75C"></l-jelly>
    </div>
  );
};

export default Callback;
