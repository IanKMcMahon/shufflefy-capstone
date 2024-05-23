import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import { Card, CardBody, Button, Form } from "react-bootstrap";
import { getTracks } from "../components/Api";
import { AuthContext } from "../AuthContext";
import Scrollbox from "../components/Scrollbox"; // Import Scrollbox component
import "./Playlist.css";
import axios from "axios";

const Playlist = () => {
  const { accessToken } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playlist = location.state?.playlist || { name: "Playlist" };

  useEffect(() => {
    const fetchTracks = async () => {
      if (!accessToken) {
        console.log("No Access Token");
        navigate("/login");
        return;
      }

      try {
        const fetchedTracks = await getTracks(id, accessToken);
        setTracks(fetchedTracks.map((item) => item.track));
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, [accessToken, navigate, id]);

  const shuffleTracks = () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
    setTracks(shuffledTracks);
    updatePlaylist(shuffledTracks);
  };

  const updatePlaylist = async (shuffledTracks) => {
    try {
      await axios.put(
        `/api/playlists/${id}`,
        { tracks: shuffledTracks },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert("Playlist updated successfully");
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  const removeSong = (trackId) => {
    setTracks(tracks.filter((track) => track.id !== trackId));
  };

  const msToTime = (duration) => {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  const toggleCheckbox = (trackId) => {
    const checkbox = document.getElementById(`checkbox-${trackId}`);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  };

  return (
    <>
      <h2 className="page-title">{playlist.name}</h2>
      <NavLink className="back-link" to="/playlists">
        Back to Playlists
      </NavLink>
      <Scrollbox>
        <Form className="checklist">
          <ul className="song-list">
            {tracks.map((track) => (
              <li key={track.id}>
                <CardBody
                  className="song-card"
                  onClick={() => toggleCheckbox(track.id)}
                >
                  <Form.Check
                    id={`checkbox-${track.id}`}
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()} // Prevents the checkbox click event from propagating to the card
                    className="custom-check"
                  />
                  <b className="song-name">{track.name}</b>
                  <p className="artist-name">{track.artists[0].name}</p>
                  <p className="song-length">{msToTime(track.duration_ms)}</p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSong(track.id);
                    }}
                  >
                    delete
                  </Button>
                </CardBody>
              </li>
            ))}
          </ul>
        </Form>
      </Scrollbox>
      <div className="playlist-buttons">
        <Button>Edit</Button>
        <Button onClick={shuffleTracks}>Shuffle</Button>
      </div>
    </>
  );
};

export default Playlist;
