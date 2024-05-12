import React from "react";
import "./Playlist.css";

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
    <div className="playlist-info-container">
      <ol>
        {songs.map((song) => (
          <li key={song}>
            <span>
              {song}
              <button onClick={() => removeSong(song)}>delete</button>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Playlist;
