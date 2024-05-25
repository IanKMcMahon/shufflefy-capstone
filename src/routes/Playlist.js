import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import { Card, CardBody, Button, Form } from "react-bootstrap";
import { getTracks } from "../components/Api";
import { AuthContext } from "../AuthContext";
import Scrollbox from "../components/Scrollbox"; // Import Scrollbox component
import "./Playlist.css";
import axios from "axios";
import "ldrs/ring";
import { jelly } from "ldrs";

jelly.register();

const Playlist = () => {
  const { accessToken } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);
  const [checkedTracks, setCheckedTracks] = useState([]);
  const [loading, setLoading] = useState(false); // State to control loading
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
        setLoading(true);
        const fetchedTracks = await getTracks(id, accessToken);
        setTracks(fetchedTracks.map((item) => item.track));
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setLoading(false);
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
      setLoading(true);
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
    } finally {
      setLoading(false);
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
    setCheckedTracks((prevCheckedTracks) => {
      if (prevCheckedTracks.includes(trackId)) {
        return prevCheckedTracks.filter((id) => id !== trackId);
      } else {
        return [...prevCheckedTracks, trackId];
      }
    });
  };

  const clearCheckedTracks = () => {
    setCheckedTracks([]);
  };

  return (
    <>
      <h2 className="page-title">{playlist.name}</h2>
      <NavLink className="back-link" to="/playlists">
        Back to Playlists
      </NavLink>
      {loading ? (
        <div className="loading-container">
          <l-jelly size="40" speed="0.9" color="#54D75C"></l-jelly>
        </div>
      ) : (
        <>
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
                        checked={checkedTracks.includes(track.id)}
                      />
                      <b className="song-name">{track.name}</b>
                      <p className="artist-name">{track.artists[0].name}</p>
                      <p className="song-length">
                        {msToTime(track.duration_ms)}
                      </p>
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
            {checkedTracks.length > 0 ? (
              <>
                <Button className="delete-songs-btn">
                  Delete {checkedTracks.length} Songs
                </Button>
                <Button onClick={clearCheckedTracks}>Clear Selection</Button>
              </>
            ) : (
              <Button onClick={shuffleTracks}>Shuffle</Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Playlist;
