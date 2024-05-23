import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Playlists.css";
import { Card, CardBody, Button } from "react-bootstrap";
import { getPlaylists } from "../components/Api"; // Import getPlaylists function
import { AuthContext } from "../AuthContext";
import Scrollbox from "../components/Scrollbox"; // Import Scrollbox component

const Playlists = () => {
  const { accessToken, username, setUsername } = useContext(AuthContext); // Get context values

  const [data, setData] = useState([]); // Use useState for local state
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        let token = accessToken;

        // If no token in context, fetch a new one
        if (!token) {
          navigate("/login");
          return; // Ensure to return here if navigating away
        }

        const response = await getPlaylists(token);
        setData(response.data.items);
        setUsername(response.data.items[0]?.owner?.display_name || "User");
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [accessToken, navigate, setUsername]);

  const handleEdit = () => {
    if (selectedPlaylist) {
      navigate(`/playlists/${selectedPlaylist.id}/edit`, {
        state: { playlist: selectedPlaylist },
      });
    }
  };

  const handleShuffle = () => {
    if (selectedPlaylist) {
      navigate(`/playlists/${selectedPlaylist.id}/shuffle`, {
        state: { playlist: selectedPlaylist },
      });
    }
  };

  return (
    <>
      <h2 className="page-title">{username}'s Playlists</h2>
      <Scrollbox>
        <ul className="playlist-list">
          {data.map((playlist) => (
            <li key={playlist.id}>
              <Card
                className={`playlist-card ${
                  selectedPlaylist?.id === playlist.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <CardBody>
                  <div className="playlist-details">
                    <span className="playlist-name">{playlist.name}</span>
                    <span className="track-count">
                      Total Tracks: {playlist.tracks.total}
                    </span>
                  </div>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </Scrollbox>
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
