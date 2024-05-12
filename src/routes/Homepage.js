import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  function handleclick(e) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="start-container">
      <h1>Welcome to Shufflefy</h1>
      <p>listen to your Spotify playlists in truly random order</p>
      <Button className="start-button" onClick={handleclick}>
        GET STARTED
      </Button>
    </div>
  );
};

export default Homepage;
