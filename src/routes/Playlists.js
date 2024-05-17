import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Playlists.css";
import { Card, CardBody, Button } from "react-bootstrap";
import { getPlaylists, getToken } from "../components/Api"; // Import getToken function
import { AuthContext } from "../AuthContext";

const Playlists = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext); // Get and set accessToken from context
  const [data, setData] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        let token = accessToken;
        console.log(token);

        // If no token in context, fetch a new one
        if (!token) {
          console.log("No Token");
          navigate("/login");
        }

        const response = await getPlaylists(token);
        console.log(response);
        setData(response.data.items);
        setUsername(response.data.items[0]?.owner?.display_name || "User");
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [accessToken, setAccessToken]);

  const handleEdit = () => {
    if (selectedPlaylist) {
      navigate(`/playlists/${selectedPlaylist.id}/edit`);
    }
  };

  const handleShuffle = () => {
    if (selectedPlaylist) {
      navigate(`/playlists/${selectedPlaylist.id}/shuffle`);
    }
  };

  return (
    <>
      <h2 className="page-title">{username}'s Playlists</h2>
      <div className="playlists-container">
        <ul className="playlist-list">
          {data.map((playlist) => (
            <li key={playlist.id}>
              <Card>
                <CardBody
                  className={`playlist-card ${
                    selectedPlaylist?.id === playlist.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPlaylist(playlist)}
                >
                  <h3 className="playlist-name">{playlist.name}</h3>
                  <p className="track-count">
                    Total Tracks: {playlist.tracks.total}
                  </p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      {selectedPlaylist && (
        <div className="playlist-buttons">
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleShuffle}>Shuffle</Button>
        </div>
      )}
    </>
  );
};

export default Playlists;
