/** A landing page. from here users can read about our mission o proceed to login */

import { Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();


  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="start-container">
      <h1>Welcome to Shufflefy</h1>
      <p>Listen to your Spotify playlists in truly random order</p>
      <Button className="start-button" onClick={handleClick}>
        GET STARTED
      </Button>
      <br></br>
      <br></br>
      <NavLink className= "about-us-message" to="/about">About our Mission</NavLink>
      
    </div>
  );
};

export default Homepage;
