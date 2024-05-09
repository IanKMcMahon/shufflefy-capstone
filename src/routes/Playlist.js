import React from "react";

songs = [
  "Helena",
  "Maggie May",
  "Roxanne",
  "Brandy",
  "Cecilia",
  "Sweet Melissa",
];

for (let song of songs) {
  const removeSong = (song) => {};

  const Playlist = () => {
    return (
      <div className="playlist-info-container">
        <ol>
          <li>
            <span>
              {song}
              <button onClick={removeSong}>delete</button>
            </span>
          </li>
        </ol>
      </div>
    );
  };
}
export default Playlist;
