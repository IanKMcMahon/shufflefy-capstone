import axios from "axios";

// Define constants
const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";

// Function to request authentication token

export const getToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    }
  );
  return response.data.access_token;
};

// Function to fetch user's playlists
export const getPlaylists = async (token) => {
  const response = await axios.get(`${SPOTIFY_API_URL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.items;
};

// Function to fetch tracks for a playlist
export const getTracks = async (playlistId, token) => {
  const response = await axios.get(
    `${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.items;
};

// Function to update playlist
export const updatePlaylist = async (playlistId, trackIds, token) => {
  const response = await axios.put(
    `${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`,
    { uris: trackIds },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
