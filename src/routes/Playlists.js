import React from "react";
import "./Playlists.css";

const Playlists = () => {
  const data = [
    { playlist: "Cool Songz", songs: 22 },
    { playlist: "Cooler Songz", songs: 19 },
    { playlist: "The Best Songz", songs: 16 },
  ];

  const listPlaylists = data.map((playlist, idx) => (
    <li key={idx} value={playlist.value}>
      <div className="playlist-container">
        <h3>{playlist.playlist}</h3>
        <br></br>
        <h5 className="detail-text">
          {playlist.songs}
          <br></br>
          Songs
        </h5>
      </div>
    </li>
  ));

  //   {Object.entries(data).map(([key, val], i) => (
  //     <p key={i}>
  //         {key}: {val}
  //     </p>
  // ))}

  return (
    <div className="playlists-container">
      <ul>{listPlaylists}</ul>
    </div>
  );
};

export default Playlists;
