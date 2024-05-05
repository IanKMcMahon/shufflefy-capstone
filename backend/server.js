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
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env; // Get client credentials from environment variables

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }
    );

    // Send the access token and other relevant data back to the client
    res.json(response.data);
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
