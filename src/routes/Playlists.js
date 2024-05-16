import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Playlists.css";
import { Card, CardBody, Button } from "react-bootstrap";
import { getPlaylists } from "../components/Api";

const Playlists = ({ accessToken }) => {
  const [data, setData] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch("myplaylists.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const jsonData = await response.json();
      setData(jsonData.items);
      setUsername(jsonData.items[0]?.owner?.display_name || "User");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Uncomment this section to use real API data instead of mock data
  // useEffect(() => {
  //   const fetchPlaylists = async () => {
  //     try {
  //       const response = await getPlaylists(accessToken);
  //       setData(response.items);
  //       setUsername(response.items[0]?.owner?.display_name || "User");
  //     } catch (error) {
  //       console.error("Error fetching playlists:", error);
  //     }
  //   };

  //   if (accessToken) {
  //     fetchPlaylists();
  //   }
  // }, [accessToken]);

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
