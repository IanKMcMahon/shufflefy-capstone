import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import { CardBody, Button, Form } from "react-bootstrap";
import { getTracks } from "../components/Api";
import { AuthContext } from "../AuthContext";
import Scrollbox from "../components/Scrollbox"; // Import Scrollbox component
import "./Playlist.css";
import axios from "axios";
import "ldrs/ring";
import { jelly } from "ldrs";

jelly.register();

const Playlist = () => {
  const { accessToken, tracks, setTracks } = useContext(AuthContext);
  const [checkedTracks, setCheckedTracks] = useState([]);
  const [loading, setLoading] = useState(false); // State to control loading
  const [changesMade, setChangesMade] = useState(false); // State to track changes
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
        console.log(`Now Editing Playlist:${playlist.id}`);
        console.log(`Data: ${playlist.data}`);
        setLoading(false);
      }
    };

    fetchTracks();
  }, [accessToken, navigate, id, setTracks]);

  const shuffleTracks = () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
    setTracks(shuffledTracks);
    setChangesMade(true); // Mark changes as made
  };

  const handleExport = async () => {
    await updatePlaylist(tracks);
  
    // Save changes to the database
    await axios.post('/api/save-changes', {
      userId: currentUser.id,
      playlistId: currentPlaylist.id,
      tracks
    });
  };
  const updatePlaylist = async (shuffledTracks) => {
    try {
      // Extract URIs from the shuffled tracks
      const trackUris = shuffledTracks.slice(0, 100).map((track) => track.uri);

      setLoading(true);
      await axios.put(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        {
          uris: trackUris,
          range_start: 0,
          insert_before: 1,
          range_length: Math.min(trackUris.length, 100), // Ensure the range length is within the limit
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert("Playlist updated successfully");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error("Error response:", error.response);
        alert(
          `Error updating playlist: ${error.response.status} ${error.response.statusText} - ${error.response.data.error.message}`
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Error updating playlist: No response received from server");
      } else {
        console.error("Error message:", error.message);
        alert(`Error updating playlist: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const removeSong = (trackId) => {
    setTracks(tracks.filter((track) => track.id !== trackId));
    setChangesMade(true); // Mark changes as made
  };

  const removeCheckedTracks = () => {
    setTracks(tracks.filter((track) => !checkedTracks.includes(track.id)));
    setCheckedTracks([]);
    setChangesMade(true); // Mark changes as made
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

  const handleCheckboxChange = (trackId) => (e) => {
    e.stopPropagation();
    toggleCheckbox(trackId);
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
                        onChange={handleCheckboxChange(track.id)}
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
                <Button
                  className="delete-songs-btn"
                  onClick={removeCheckedTracks}
                >
                  Delete {checkedTracks.length} Songs
                </Button>
                <Button onClick={clearCheckedTracks}>Clear Selection</Button>
              </>
            ) : (
              <Button onClick={shuffleTracks}>SHUFFLE</Button>
            )}
            {changesMade && (
              <>
                <Button onClick={handleExport} className="export-playlist-btn">
                  EXPORT
                </Button>
                <p className="export-message">
                  All done making changes? Export your playlist and start
                  listening now
                </p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Playlist;
