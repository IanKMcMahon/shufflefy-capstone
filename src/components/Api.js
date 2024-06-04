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


// Added Functionality for later...

// export const getSavedSongs = async (token) => {
//   const response = await axios.get(`${SPOTIFY_API_URL}/me/tracks`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response;
// };
