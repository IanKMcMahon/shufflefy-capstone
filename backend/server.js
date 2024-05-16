// server.js (Node.js with Express)

const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Route for handling token exchange
app.post("/exchange-token", async (req, res) => {
  const { code } = req.body; // Authorization code from client
  console.log(code);
  const CLIENT_ID = "db419786e9514488959cb7765ca0902d";
  const CLIENT_SECRET = "be28e145fe7b4f9ea08366d8a1559406";
  const REDIRECT_URI = "http://localhost:3000/callback";
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        },
      }
    );

    // Log the entire response object for debugging
    console.log(response);

    // Check if response.data is defined before accessing it
    if (response.data) {
      // Log the response data for debugging
      console.log(response.data);
      // Send the access token and other relevant data back to the client
      res.json(response.data);
    } else {
      throw new Error("Empty response from Spotify API");
    }
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).json({ error: "Failed to exchange code for token" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
