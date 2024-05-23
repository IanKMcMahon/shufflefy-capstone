import React from "react";
import "./App.css"; // Import your CSS styles here
import AppRouter from "./routes/Routes.js"; // Import your Router component
import Callback from "./components/Callback";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./AuthContext.js";
import Navigation from "./components/Navigation.js";
function App() {
  const data = [
    { playlist: "Cool Songz", songs: 22 },
    { playlist: "Cooler Songz", songs: 19 },
    { playlist: "The Best Songz", songs: 16 },
  ];

  return (
    <div className="App">
      <Navigation />
      <AppRouter playlists={data} />
    </div>
  );
}

export default App;
