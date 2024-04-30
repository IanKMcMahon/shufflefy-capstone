import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import Playlist from "./Playlist";
import Playlists from "./Playlists";
import Callback from "../components/Callback";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/callback" component={<Callback />} />
        <Route exact path="/playlists" element={<Playlists />} />
        <Route exact path="/playlists/:name" element={<Playlist />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
