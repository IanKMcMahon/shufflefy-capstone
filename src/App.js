import React from "react";
import "./App.css"; // Import your CSS styles here
import AppRouter from "./routes/Routes.js"; // Import your Router component
import Callback from "./components/Callback";
import { getToken, getPlaylists, getTracks } from "./components/Api.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const data = [
    { playlist: "Cool Songz", songs: 22 },
    { playlist: "Cooler Songz", songs: 19 },
    { playlist: "The Best Songz", songs: 16 },
  ];

  return <AppRouter playlists={data} />;
}

export default App;
