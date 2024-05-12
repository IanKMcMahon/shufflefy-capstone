import React, { useEffect, useState } from "react";
import "./Playlists.css";
import { getPlaylists } from "../components/Api";

const Playlists = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState([]);
  const [data, setData] = useState([]);

  const getData = () => {
    fetch("myplaylists.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   const fetchPlaylists = async () => {
  //     try {
  //       // const data = await getPlaylists(accessToken);
  //       setPlaylists(data.items);
  //     } catch (error) {
  //       console.error("Error fetching playlists:", error);
  //       // Handle error if needed
  //     }
  //   };

  //   if (accessToken) {
  //     fetchPlaylists();
  //   }
  // }, [accessToken]);

  const mockdata = data.items;
  console.log(mockdata);
  return (
    <div className="playlists-container">
      <h2>My Playlists</h2>
      <ul>
        {mockdata.map((playlist) => (
          <li key={playlist.id}>
            <h3>{playlist.name}</h3>
            <p>Total Tracks: {playlist.tracks.total}</p>
            {/* Additional playlist details can be rendered here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
