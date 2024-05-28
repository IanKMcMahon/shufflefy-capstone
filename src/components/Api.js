import axios from "axios";

// Define constants
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

// Function to fetch user's playlists
export const getPlaylists = async (token) => {
  const response = await axios.get(`${SPOTIFY_API_URL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Added Functionality for later...

// export const getSavedSongs = async (token) => {
//   const response = await axios.get(`${SPOTIFY_API_URL}/me/tracks`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response;
// };

// Function to fetch tracks for a playlist
export const getTracks = async (playlistId, accessToken) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.items; // Return the items array from the response
  } catch (error) {
    console.error(
      "Error fetching tracks:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
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
