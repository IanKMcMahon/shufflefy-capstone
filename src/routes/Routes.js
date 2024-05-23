import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
      <Route exact path="/playlists/:id" element={<Playlist />} />
      <Route exact path="/playlists/:id/edit" element={<Playlist />} />
      <Route exact path="/playlists/:id/shuffle" element={<Shuffle />} />
      <Route exact path="/error" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
