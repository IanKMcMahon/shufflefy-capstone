import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

const Testlist = () => {
  const { tracks } = useContext(AuthContext);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  return (
    <>
      <h1> Playlists </h1>
      <ListGroup>
        {tracks.map((track) => (
          <ListGroup.Item key={track.id}>{track.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Testlist;
