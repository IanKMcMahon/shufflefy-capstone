import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import Playlist from "./Playlist";
import Playlists from "./Playlists";
import Callback from "../components/Callback";
import Error from "./Error";
import AboutUs from "./About";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/playlists/:id" element={<Playlist />} />
      <Route path="/playlists/:id/edit" element={<Playlist />} />
      <Route path="/about" element= {<AboutUs />}/>
      <Route path="/error" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
