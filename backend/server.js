const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser
const apiRoutes = require("./routes/api");
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Use the API routes
app.use("/api", apiRoutes);
debugger
// Route for handling token exchange
app.post("/exchange-token", async (req, res) => {
  const { code } = req.body; // Authorization code from client

  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  console.log("Authorization code received:", code);

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    );

    if (response.data && response.data.access_token) {
      console.log("Access token received:", response.data.access_token);
      res.json(response.data); // Send the access token and other relevant data back to the client
    } else {
      throw new Error("Empty response from Spotify API");
    }
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code that falls out of the range of 2xx
      console.error(
        `Error response from Spotify API: ${error.response.status} - ${error.response.statusText}`
      );
      console.error("Response data:", error.response.data);

      if (error.response.status === 400) {
        res.status(400).json({ error: "Invalid authorization code" });
      } else if (error.response.status === 401) {
        res.status(401).json({ error: "Unauthorized. Check your credentials" });
      } else {
        res
          .status(error.response.status)
          .json({ error: error.response.statusText });
      }
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received from Spotify API:", error.request);
      res
        .status(502)
        .json({ error: "Bad gateway. No response from Spotify API" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error in setting up the request:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
