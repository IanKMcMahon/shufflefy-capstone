import React from "react";
import { Button } from "react-bootstrap";
import "./Homepage.css";

const Homepage = () => {
  function handleclick(e) {
    e.preventDefault();
    console.log("Hey you did it");
  }

  return (
    <div className="start-container">
      <h1>Welcome to Shufflefy</h1>
      <p>listen to your Spotify playlists in truly random order</p>
      <button className="start-button" onClick={handleclick}>
        GET STARTED
      </button>
    </div>
  );
};

export default Homepage;
