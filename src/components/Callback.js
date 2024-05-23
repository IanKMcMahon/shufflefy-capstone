import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.js";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
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
    };

    fetchData();
  }, [location.search, setAccessToken]);

  useEffect(() => {
    if (accessToken) {
      console.log("Navigating to playlists with access token:", accessToken);
      navigate("/playlists");
    }
  }, [accessToken, navigate]);

  return <div>LOADING...</div>;
};

export default Callback;
