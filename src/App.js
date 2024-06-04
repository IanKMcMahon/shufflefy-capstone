/**
 * App Component
 * 
 * This is the root component of the application. It sets up the main structure,
 * including the navigation bar and the routing. The AuthProvider wraps the entire
 * application to provide authentication context to all components.
 */

import React from "react";
import "./App.css"; // Import your CSS styles here
import AppRouter from "./routes/Routes.js"; // Import your Router component
import "bootstrap/dist/css/bootstrap.min.css";
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
