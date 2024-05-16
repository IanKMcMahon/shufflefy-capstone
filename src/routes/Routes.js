import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import Playlist from "./Playlist";
import Playlists from "./Playlists";
import Callback from "../components/Callback";
import Error from "./Error";
import Shuffle from "./Shuffle";

const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route
          path="/test"
          element={
            <PrivateRoute auth={isAuthenticated}>
              <Playlists />
            </PrivateRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/callback" element={<Callback />} />
        <Route exact path="/playlists" element={<Playlists />} />
        <Route exact path="/playlists/:name" element={<Playlist />} />
        <Route exact path="/playlists/:name/edit" element={<Playlist />} />
        <Route exact path="/playlists/:name/shuffle" element={<Shuffle />} />
        <Route exact path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
