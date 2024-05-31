import React from "react";
import "./App.css"; // Import your CSS styles here
import AppRouter from "./routes/Routes.js"; // Import your Router component
import Callback from "./components/Callback";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./AuthContext.js";
import Navigation from "./components/Navigation.js";
function App() {
  const data = [];

  return (
    <div className="App">
      <Navigation />
      <AppRouter playlists={data} />
    </div>
  );
}

export default App;
