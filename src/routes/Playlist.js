import React from "react";
import "./Playlist.css";
import { Card, CardBody, Button, Form } from "react-bootstrap";

const Playlist = () => {
  const songs = [
    "Helena",
    "Maggie May",
    "Roxanne",
    "Brandy",
    "Cecilia",
    "Sweet Melissa",
  ];

  const removeSong = (song) => {
    // Implement logic to remove the song from the playlist
  };

  return (
    <>
      <h2 className="page-title">{Playlist}</h2>
      <div className="playlist-info-container">
        <Form className="checklist">
          <ul className="song-list">
            {songs.map((song) => (
              <li key={song.id}>
                <CardBody className={"song-card"}>
                  <Form.Check type="checkbox" />
                  <b className="song-name">{song}</b>
                  <p className="artist-name">ARTIST</p>
                  <p className="song-length">00:00:00</p>
                  <Button onClick={() => removeSong(song)}>delete</Button>
                </CardBody>
              </li>
            ))}
          </ul>
        </Form>
      </div>
    </>
  );
};
export default Playlist;
