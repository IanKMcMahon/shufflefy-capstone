import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import { CardBody, Button, Form } from "react-bootstrap";
import { getTracks } from "../components/Api";
import { AuthContext } from "../AuthContext";
import Scrollbox from "../components/Scrollbox";
import "./Playlist.css";
import axios from "axios";
import "ldrs/ring";
import { jelly } from "ldrs";

jelly.register();

const Playlist = () => {
  const { accessToken, tracks, setTracks, username } = useContext(AuthContext);
  const [checkedTracks, setCheckedTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songsDeleted, setSongsDeleted] = useState(false);
  const [songsShuffled, setSongsShuffled] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playlist = location.state?.playlist || { name: "Playlist" };

  useEffect(() => {
    const fetchTracks = async () => {
      if (!accessToken) {
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
  }, [accessToken, navigate, id, setTracks]);

  const shuffleTracks = () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
    setTracks(shuffledTracks);
    setSongsShuffled(true);
  };

  const saveChanges = async (updatedTracks) => {
    try {
      const trackUris = updatedTracks.map((track) => track.uri);
      const payload = {
        userId: username,
        playlistId: id,
        tracks: trackUris.join(', '),
      };
      console.log(payload);
      await axios.post('http://localhost:5000/api/save-changes', payload);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const updatePlaylistOnSpotify = async (updatedTracks) => {
    try {
      const trackUris = updatedTracks.slice(0, 100).map((track) => track.uri);
      debugger
      setLoading(true);
      await axios.put(
        `/api/spotify-playlists/${id}/tracks`,
        {
          uris: trackUris,
          range_start: 0,
          insert_before: 1,
          range_length: Math.min(trackUris.length, 100),
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
          `Error updating playlist: ${error.response.status} ${error.response.statusText} - `
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
    const updatedTracks = tracks.filter((track) => track.id !== trackId);
    setTracks(updatedTracks);
    setSongsDeleted(true);
    saveChanges(updatedTracks);
  };

  const removeCheckedTracks = () => {
    const updatedTracks = tracks.filter((track) => !checkedTracks.includes(track.id));
    setTracks(updatedTracks);
    setCheckedTracks([]);
    setSongsDeleted(true);
    saveChanges(updatedTracks);
  };

  const handleUndo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/undo-changes', {
        playlistId: id
      });

      if (response.data.tracks) {
        setTracks(response.data.tracks);
        setSongsDeleted(false);
        setSongsShuffled(false);  
      }
    } catch (error) {
      console.error('Error undoing changes:', error);
    }
  };

  const clearCheckedTracks = () => {
    setCheckedTracks([]);
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
            {songsDeleted && (
              <Button onClick={handleUndo} className="undo-playlist-btn">
                UNDO
              </Button>
            )}
            {(songsDeleted || songsShuffled) && (
              <>
                <Button onClick={() => updatePlaylistOnSpotify(tracks)} className="export-playlist-btn">
                  EXPORT
                </Button>
                <p className="export-message">
                  All done making changes? Export your playlist and start
                  listening now.
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
